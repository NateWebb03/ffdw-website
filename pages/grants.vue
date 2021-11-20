<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <BlockBuilder :sections="sections" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import GrantsPageData from '@/content/pages/grants.json'

import Modal from '@/components/Modal'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageGrants',

  components: {
    Modal,
    BlockBuilder
  },

  data () {
    return {
      tag: 'grants'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'grants', data: GrantsPageData })
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
