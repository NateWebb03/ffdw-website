<template>
  <div class="block video-block">

    <div class="preview-container" @click="openModal">
      <div class="overlay">
        <IconPlay class="play-icon" />
      </div>
      <div v-if="tint" class="tint"></div>
      <img :src="preview_image" class="preview-image" />
    </div>

    <Button
      v-if="subtext"
      :button="subtext"
      class="subtext" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

import IconPlay from '@/components/icons/Play'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'VideoBlock',

  components: {
    IconPlay,
    Button
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    preview_image () {
      return this.block.preview_image
    },
    url () {
      return this.block.url
    },
    tint () {
      return this.block.tint
    },
    subtext () {
      return this.block.subtext
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal () {
      this.setModal({
        action: 'video',
        url: this.url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.preview-container {
  position: relative;
  cursor: pointer;
  &:hover {
    ::v-deep .play-icon {
      transition: 250ms ease-in;
      transform: scale(1.1);
    }
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    right: 100%;
    width: 2.5rem;
  }
  &:before {
    top: 30%;
    height: 2.5rem;
    background-color: $greenYellow;
  }
  &:after {
    bottom: -5rem;
    height: calc(50%);
    background-color: $perfume;
  }
}

// ///////////////////////////////////////////////////////////////////// Overlay
.overlay {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  transition: 250ms ease-out;
}

::v-deep .play-icon {
  width: 3.75rem;
  transition: 250ms ease-out;
}

// /////////////////////////////////////////////////////////////// Preview Image
.tint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: $haiti;
  opacity: 0.3;
  z-index: 10;
}

.preview-image {
  position: relative;
  display: block;
  width: 100%;
  z-index: 5;
}

// ///////////////////////////////////////////////////////////////////// Subtext
.subtext {
  @include label_3;
  padding: 0.5rem 0 0 0.5rem;
}
</style>
