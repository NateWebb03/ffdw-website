<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

    <CareersBlock theme="purple" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import AboutPageData from '@/content/pages/about.json'
import CareersData from '@/content/data/careers.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CareersBlock from '@/components/CareersBlock'

// ====================================================================== Export
export default {
  name: 'PageAbout',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    CareersBlock
  },

  data () {
    return {
      tag: 'about'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'about', data: AboutPageData })
    await store.dispatch('global/getBaseData', { key: 'careers_data', data: CareersData })
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
      return this.pageData.page_content
    },
    header () {
      return this.pageData.header
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro_1 {
  padding-top: 12rem;
  .text-block {
    .heading {
      font-size: 3.0625rem;
    }
  }
  .image-block {
    margin-top: 3rem;
  }
}

::v-deep #intro_2 {
  padding-top: 0;
  padding-bottom: 3rem;
  .image-block {
    margin-top: -5rem;
  }
}

::v-deep #vision_1 {
  padding-top: 0;
}

::v-deep #vision_2 {
  [data-block-id="col_1"] {
    .image-block {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2.5rem;
        height: 2.5rem;
        background-color: $haiti;
      }
    }
  }
  [data-block-id="col_2"] {
    .text-block {
      padding: 0 2.5rem;
    }
  }
  [data-block-id="col_3"] {
    .column-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
    }
    .image-block {
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 2.5rem;
        height: 2.5rem;
        background-color: $haiti;
      }
    }
  }
}
</style>
