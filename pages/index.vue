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

import IndexPageData from '@/content/pages/index.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    Modal,
    HeaderSelector,
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
::v-deep #about_1 {
  .text-block {
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2.5rem;
    }
    &:before {
      width: 2.5rem;
      top: 1rem;
      left: 100%;
      background-color: $perfume;
    }
    &:after {
      width: 20rem;
      top: 3.5rem;
      left: calc(100% + 2.5rem);
      background-color: $greenYellow;
    }
  }
}

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
  .accordion-block {
    &:before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 7rem;
      top: 20%;
      right: calc(100% + #{math.div($containerWidth, 12) * 3} - 2rem);
      background-color: $perfume;
    }
  }
  .text-block {
    .button-row {
      justify-content: flex-end;
    }
  }
}

::v-deep #grants {
  .image_left {
    .image-block {
      &:before {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: calc(50% + 3rem);
        top: -3rem;
        right: 100%;
        background-color: $greenYellow;
      }
    }
  }
  .text-block {
    padding: 0 2.25rem;
  }
  .image_right {
    .image-block {
      &:before {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: calc(20% + 4rem);
        bottom: -4rem;
        left: 100%;
        background-color: $perfume;
      }
    }
  }
}

::v-deep #callout {
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    padding: 0;
  }
}
</style>
