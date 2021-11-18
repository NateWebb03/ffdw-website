<template>
  <div class="page page-index">

    <Modal />

    <BlockBuilder :sections="sections" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import IndexPageData from '@/content/pages/index.json'

import Modal from '@/components/Modal'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    Modal,
    BlockBuilder
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      return this.siteContent.index.page_content
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro_1 {
  padding: 0;
  .image-block {
    padding: 0 3rem;
  }
}

::v-deep #intro_2 {
  padding-top: 2rem;
}

::v-deep #accordion_1 {
  padding: 0;
}

::v-deep #grants {
  .text-block {
    padding: 0 2rem;
  }
}
</style>
