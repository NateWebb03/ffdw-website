<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import ContactPageData from '@/content/pages/contact.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageContact',

  components: {
    Modal,
    BlockBuilder,
    HeaderSelector
  },

  data () {
    return {
      tag: 'contact'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'contact', data: ContactPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    sections () {
      return this.siteContent[this.tag].page_content
    },
    header () {
      return this.pageData.header
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #learn_1 .grid {
  > :not(:first-child) {
    padding-left: 5.1875rem;
    padding-right: 0;
  }

  > :not(:last-child) {
    border-right: 0.25rem solid $cararra;
    padding-right: 7.5rem;
  }
}

::v-deep .description {
  @include fontSize_Small;
}

::v-deep #learn_1 .button {
  position: absolute;
  top: calc(100% - 0.4375rem);
}
</style>
