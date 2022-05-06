<template>
  <div class="block slate-list-block">

    <template v-for="(video, index) in videos">

      <VideoBlock
        v-if="video.isPublic"
        :key="index"
        type="slate-video"
        :block="video" />

    </template>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import VideoBlock from '@/components/VideoBlock'

// ====================================================================== Export
export default {
  name: 'SlateVideoBlock',

  components: {
    VideoBlock
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      slateCollections: 'global/slateCollections'
    }),
    videos () {
      if (this.slateCollections) {
        const collection = this.slateCollections.find((col) => { return col.slatename === this.block.slatename })
        return collection.objects.filter((obj) => { return !obj.url })
      }
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
</style>
