<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

    <CareersBlock
      :theme="careersTheme"
      :force-heading="careersHeading" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import GetInvolvedPageData from '@/content/pages/get-involved.json'
import CareersData from '@/content/data/careers.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CareersBlock from '@/components/CareersBlock'

// ====================================================================== Export
export default {
  name: 'PageGetInvolved',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    CareersBlock
  },

  data () {
    return {
      tag: 'get-involved'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'get-involved', data: GetInvolvedPageData })
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
    },
    careers () {
      return this.pageData.careers
    },
    careersTheme () {
      return this.careers.theme
    },
    careersHeading () {
      return this.careers.heading || false
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro_1 {
  padding-top: 12rem;
  padding-bottom: 0;
  .text-block {
    margin-top: -10rem;
  }
}

::v-deep #intro_2 {
  padding-top: 3rem;
}

::v-deep #intro_3 {
  padding: 0;
  .card-list-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card {
    margin-bottom: 5rem;
    width: calc(50% - #{math.div($containerWidth, 24)});
    &:nth-child(odd) {
      margin-right: math.div($containerWidth, 12);
    }
    .title {
      @include fontSize_Medium;
      margin-bottom: 1rem;
    }
    .description {
      @include p3;
    }
    .icon-after.arrow-down {
      svg {
        width: 0.75rem;
        transform: rotate(-90deg);
        rect {
          fill: $greenYellow;
        }
      }
    }
  }
}

::v-deep #callout {
  padding-bottom: 0;
}

::v-deep #grants_1 {
  padding-bottom: 0;
}

::v-deep #grants_accordion {
  padding-bottom: 7rem;
}
</style>
