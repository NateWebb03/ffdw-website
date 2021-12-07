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
::v-deep #learn_1 {
  padding-top: 10rem;
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    > :not(:first-child) {
      padding-left: 5.1875rem;
      padding-right: 0;
    }
    > :not(:last-child) {
      border-right: 0.25rem solid $cararra;
      padding-right: 7.5rem;
    }
  }
  .description {
    @include fontSize_Small;
  }
  .button-row {
    margin-top: 2rem;
  }
  .button {
    margin-bottom: -4rem;
  }
}

::v-deep #reach_1 {
  padding-top: 2rem;
  padding-bottom: 0;
}

::v-deep #form {
  padding-top: 3rem;
  padding-bottom: 0;
}
</style>
