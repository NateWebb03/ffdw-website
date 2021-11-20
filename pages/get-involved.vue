<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <BlockBuilder :sections="sections" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import GetInvolvedPageData from '@/content/pages/get-involved.json'

import Modal from '@/components/Modal'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageGetInvolved',

  components: {
    Modal,
    BlockBuilder
  },

  data () {
    return {
      tag: 'get-involved'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'get-involved', data: GetInvolvedPageData })
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
</style>
