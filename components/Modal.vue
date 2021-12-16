<template>
  <div
    id="modal"
    ref="modal"
    :class="{ active: modal }"
    @click="closeModal($event)"
    @keyup.esc="closeModal">

    <section id="modal-video">

      <div
        ref="toolbar"
        class="toolbar">
        <button
          ref="closeButton"
          class="close-button"
          @click="closeModal">
          Close
        </button>
      </div>

      <div
        v-if="action === 'video' && url"
        class="video-wrapper">

        <template v-if="type === 'video' && getEmbedUrl()">
          <iframe
            :src="getEmbedUrl()"
            class="video"
            allow="autoplay; encrypted-media"
            allowfullscreen>
          </iframe>
        </template>

        <div
          v-if="type === 'slate-video'"
          class="slate-video-container">
          <video
            id="slate-video-player"
            ref="slatePlayer"
            playsinline
            controls
            :data-poster="type === 'slate-video' ? slateImage : ''">
            <source
              :src="type === 'slate-video' ? url : ''"
              :type="slateVideoType" />
          </video>
        </div>

      </div>

    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import Plyr from 'plyr'

// ====================================================================== Export
export default {
  name: 'Modal',

  data () {
    return {
      initialized: false,
      player: false
    }
  },

  computed: {
    ...mapGetters({
      modal: 'global/modal'
    }),
    action () {
      return this.modal.action
    },
    type () {
      return this.modal.hasOwnProperty('type') ? this.modal.type : ''
    },
    url () {
      return this.modal.url
    },
    slateImage () {
      return this.modal.hasOwnProperty('slateImage') ? this.modal.slateImage : ''
    },
    slateVideoType () {
      return this.modal.hasOwnProperty('slateVideoType') ? this.modal.slateVideoType : ''
    }
  },

  watch: {
    type (val) {
      if (val === 'slate-video') {
        this.$nextTick(() => {
          this.player = new Plyr(this.$refs.slatePlayer)
          this.player.on('ready', (event) => {
            this.player.play()
          })
        })
      }
    }
  },

  mounted () {
    window.addEventListener('keydown', (e) => {
      const key = e.key || e.keyCode
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.closeModal()
      }
    })
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    closeModal (e) {
      if (e.target === this.$refs.modal || e.target === this.$refs.closeButton || e.target === this.$refs.toolbar) {
        if (this.modal) {
          this.setModal(false)
        }
        if (this.player) {
          this.player = false
        }
      }
    },
    getEmbedUrl () {
      return `${this.$BuildVideoEmbedUrl(this.$ParseVideoUrl(this.url))}?autoplay=1`
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#modal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
  &:before {
    content: '';
    position: absolute;
    top: inherit;
    left: inherit;
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    z-index: 5;
    transition: 250ms ease-out;
  }
  &.active {
    visibility: visible;
    pointer-events: all;
    z-index: 10000;
    &:before {
      transition: 250ms ease-in;
      opacity: 1;
    }
    #modal-video {
      transition: 250ms 100ms ease-in;
      transform: translateY(0);
      opacity: 1;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Toolbar
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.close-button {
  @include fontWeight_Semibold;
  color: white;
  padding: 0.5rem 1rem;
}

// /////////////////////////////////////////////////////////////// [Modal] Video
#modal-video {
  position: relative;
  width: 50rem;
  opacity: 0;
  transform: translateY(2rem);
  z-index: 10;
  transition: 250ms ease-out;
  @include small {
    width: 100%;
    padding: 0 2rem;
  }
}

.slate-video-container {
  position: relative;
  cursor: pointer;
  width: 100%;
  video {
    width: 100%;
  }
}
</style>
