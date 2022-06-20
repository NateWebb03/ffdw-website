<template>
  <div class="block video-block">

    <div class="preview-container" @click="openModal">

      <div :class="['overlay', { fallback: !preview_image }]">
        <IconPlay class="play-icon" />
      </div>
      <div :class="['tint', { fallback: !preview_image }]"></div>

      <img
        v-if="preview_image"
        :src="preview_image"
        class="preview-image" />

      <VideoPreviewImage
        v-if="!preview_image"
        variant="C"
        class="preview-image" />

    </div>

    <div v-if="date" class="metadata">
      <span class="date" v-html="getDate(date)" />
      <template v-if="tags">
        <span class="bar">|</span>
        <span
          v-for="tag in tags"
          :key="tag"
          class="tag">
          {{ tag }}
        </span>
      </template>
    </div>

    <div v-if="title" class="title">
      {{ title }}
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
import VideoPreviewImage from '@/components/svgs/VideoPreviewImage'

// ====================================================================== Export
export default {
  name: 'SlateVideoBlock',

  components: {
    IconPlay,
    Button,
    VideoPreviewImage
  },

  props: {
    block: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'video'
    }
  },

  computed: {
    isSlateVideo () {
      return this.type === 'slate-video'
    },
    preview_image () {
      if (this.isSlateVideo) {
        if (this.block.data.coverImage) {
          return `https://gateway.ipfs.io/ipfs/${this.block.data.coverImage.cid}`
        }
        if (this.block.data.linkImage) {
          return this.block.data.linkImage
        }
        return false
      }
      return this.block.preview_image
    },
    url () {
      return !this.isSlateVideo ? this.block.url : `https://gateway.ipfs.io/ipfs/${this.block.cid}`
    },
    tint () {
      return this.block.tint
    },
    subtext () {
      return this.isSlateVideo ? {
        type: 'D',
        theme: this.theme,
        text: this.title,
        icon_after: 'arrow-down'
      } : this.block.subtext
    },
    title () {
      return this.isSlateVideo ? this.block.data.name : this.block.title
    },
    date () {
      return this.isSlateVideo ? this.block.createdAt : this.block.date
    },
    tags () {
      return this.isSlateVideo ? this.block.data.tags : this.block.tags
    },
    slateVideoType () {
      return this.isSlateVideo ? this.block.data.type : ''
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal () {
      this.setModal({
        action: 'video',
        type: this.type,
        url: this.url,
        slateImage: this.preview_image,
        slateVideoType: this.slateVideoType
      })
    },
    getDate (date) {
      const start = this.$moment.utc(new Date(date))
      return `${start.format('MMMM DD YYYY')}`
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
      transform: translate(-50%, -50%) scale(1.15);
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Overlay
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.6875rem 0 0 0.6875rem;
  z-index: 15;
  transition: 250ms ease-out;
  &.fallback {
    ::v-deep rect {
      fill: $haiti;
    }
  }
}

::v-deep .play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  &.fallback {
    display: none;
  }
}

.preview-image {
  position: relative;
  display: block;
  width: 100%;
  z-index: 5;
}

// ///////////////////////////////////////////////////////////////////// Content
::v-deep .subtext {
  @include label_3;
  padding: 0.5rem 0 0 1rem;
  .icon-after.arrow-down {
    svg {
      width: 0.75rem;
      transform: rotate(-90deg);
      rect {
        fill: $cararra;
      }
    }
  }
}

.metadata {
  @include label_2;
  margin-top: 1rem;
  .bar {
    margin: 0 0.25rem;
  }
}

.title {
  @include p1;
  margin-top: 1rem;
}
</style>
