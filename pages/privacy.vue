<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <section id="privacy-body" class="content-section">
      <div class="grid">

        <div class="col-10_sm-12" data-push-left="off-1_sm-0">
          <nuxt-content :document="privacy" class="basic-template-block-format" />
        </div>

      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import PrivacyPageData from '@/content/pages/privacy.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'

// ====================================================================== Export
export default {
  name: 'PagePrivacy',

  components: {
    Modal,
    HeaderSelector
  },

  async asyncData ({ $content }) {
    const privacy = await $content('privacy-policy').fetch()
    return { privacy }
  },

  data () {
    return {
      tag: 'privacy'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'privacy', data: PrivacyPageData })
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
#privacy-body {
  padding: 5rem 0;
}

.page-privacy {
  ::v-deep .header {
    .heading,
    .description {
      text-align: center;
      padding: 0 1.5rem;
    }
  }
}
</style>
