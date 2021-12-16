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
  @include small {
    padding-top: 5rem;
  }
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    > :not(:first-child) {
      padding-left: 5.1875rem;
      padding-right: 0;
      @include containerMaxMQ {
        padding-left: 2rem;
      }
      @include mini {
        padding: 0 0.5rem 1rem;
        border-bottom: 0.25rem solid $cararra;
      }
    }
    > :not(:last-child) {
      border-right: 0.25rem solid $cararra;
      padding-right: 7.5rem;
      @include containerMaxMQ {
        padding-right: 2rem;
      }
      @include mini {
        padding: 0 0.5rem 1rem;
        margin-bottom: 3rem;
        border-right: 0;
        border-bottom: 0.25rem solid $cararra;
      }
    }
    .col-4:first-child {
      a {
        @include gradient_Background_RedPurple ;
        background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        text-fill-color: transparent;
      }
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
    @include mini {
      margin-bottom: 0;
    }
  }
  
}

::v-deep #reach_1 {
  padding-top: 2rem;
  padding-bottom: 0;
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .text-block {
    @include small {
      margin-top: 3rem;
    }
  }
}

::v-deep #form {
  padding-top: 3rem;
  padding-bottom: 0;
}
</style>
