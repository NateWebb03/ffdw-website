<template>
  <div class="master-container">

    <nuxt />

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports
import SiteFooter from '@/components/SiteFooter'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    SiteFooter
  },

  mounted () {
    const hash = this.$route.hash.replace('#', '')
    if (hash) {
      const element = document.getElementById(hash) || document.querySelector(`[data-id='${hash}']`)
      if (element) {
        this.$scrollToElement(element, 0, -50)
      }
    }
  }
}
</script>
