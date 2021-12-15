<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <section id="terms-body" class="content-section">
      <div class="grid">

        <div class="col-10_sm-12" data-push-left="off-1_sm-0">
          <nuxt-content :document="terms" class="basic-template-block-format" />
        </div>

      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import TermsPageData from '@/content/pages/terms.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'

// ====================================================================== Export
export default {
  name: 'PageTerms',

  components: {
    Modal,
    HeaderSelector
  },

  async asyncData ({ $content }) {
    const terms = await $content('terms-of-use').fetch()
    return { terms }
  },

  data () {
    return {
      tag: 'terms'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'terms', data: TermsPageData })
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
    header () {
      return this.pageData.header
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
#terms-body {
  padding: 5rem 0;
}

.page-terms {
  ::v-deep .header {
    .heading,
    .description {
      text-align: center;
      padding: 0 1.5rem;
    }
  }
}
</style>
