<template>
  <div class="block video-block">
    <div
      v-for="(video, index) in videos"
      :key="video.filename"
      class="preview-container">

      <div class="video-container">
        <video
          :id="`player_${index}`"
          playsinline
          controls
          :data-poster="getPreviewImage(video)">

          <source
            :src="getVideoUrl(video)"
            :type="getVideoType(video)" />

        </video>
      </div>

      <div v-if="date || tags" class="metadata">
        <span
          v-if="date"
          class="date"
          v-html="getDate(video.createdAt)" />
        <template v-if="tags">
          <span class="bar">|</span>
          <span
            v-for="tag in video.data.tags"
            :key="tag"
            class="tag">
            {{ tag }}
          </span>
        </template>
      </div>

      <div v-if="title" class="title">
        {{ getTitle(video) }}
      </div>

      <div
        v-if="subtext"
        class="subtext">
        {{ subtext }}
      </div>

    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import Plyr from 'plyr'

// ====================================================================== Export
export default {
  name: 'SlateVideoBlock',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      players: []
    }
  },

  computed: {
    ...mapGetters({
      slateCollections: 'global/slateCollections'
    }),
    videos () {
      const collection = this.slateCollections.find((col) => { return col.slatename === this.block.slatename })
      return collection.objects.filter((obj) => { return !obj.url })
      // return collection.objects
    },
    subtext () {
      return this.videos.length === 1 ? this.videos[0].data.name : ''
    },
    title () {
      return this.block.title
    },
    date () {
      return this.block.date
    },
    tags () {
      return this.block.tags
    }
  },

  mounted () {
    this.videos.forEach((video, index) => {
      this.players[index] = new Plyr(`#player_${index}`)
    })
  },

  methods: {
    getTitle (video) {
      return video.data.name && video.isPublic ? video.data.name : ''
    },
    getDate (date) {
      const start = this.$moment.utc(new Date(date))
      return `${start.format('MMMM DD YYYY')}`
    },
    getPreviewImage (video) {
      if (video.data.coverImage && video.isPublic) {
        return `https://gateway.ipfs.io/ipfs/${video.data.coverImage.cid}`
      }
      if (video.data.link && video.isPublic) {
        return video.data.link.image
      }
      return false
    },
    getVideoUrl (video) {
      return video.isPublic ? `https://gateway.ipfs.io/ipfs/${video.cid}` : ''
    },
    getVideoType (video) {
      return video.isPublic ? video.data.type : ''
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.video-block {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.preview-container {
  flex: calc(50% - 0.5rem);
  &:nth-child(odd) {
    margin-right: 1rem;
  }
}

.video-container {
  position: relative;
  cursor: pointer;
}

// ///////////////////////////////////////////////////////////////////// Content
.subtext {
  @include label_3;
  padding: 0.5rem 0 0 0.75rem;
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
  @include fontWeight_Semibold;
  margin-top: 1rem;
  padding-right: 4.5rem;
}

</style>
