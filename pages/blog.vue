<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <BlockBuilder :sections="sections" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageBlog',

  components: {
    Modal,
    BlockBuilder
  },

  data () {
    return {
      tag: 'blog'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'blog', data: BlogPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      return this.siteContent[this.tag].page_content
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro {
  // padding: 0;
  // .image-block {
  //   padding: 0 3rem;
  // }
}
//
// ::v-deep #intro_2 {
//   padding-top: 2rem;
// }
//
// ::v-deep #accordion_1 {
//   padding: 0;
// }
//
// ::v-deep #grants {
//   .text-block {
//     padding: 0 2rem;
//   }
// }
</style>
