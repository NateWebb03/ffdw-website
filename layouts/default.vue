<template>
  <div class="master-container">

    <nuxt />

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import SiteFooter from '@/components/SiteFooter'

const scrollToAnchor = (instance) => {
  const hash = instance.$route.hash.replace('#', '')
  if (hash) {
    const element = document.getElementById(hash) || document.querySelector(`[data-id='${hash}']`)
    if (element) {
      instance.$scrollToElement(element, 0, -50)
    }
  }
}

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    SiteFooter
  },

  computed: {
    ...mapGetters({
      navigationOpen: 'global/navigationOpen'
    })
  },

  watch: {
    '$route' () {
      this.setNavigationOpen(false)
      scrollToAnchor(this)
    },
    navigationOpen (state) {
      if (state) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  },

  mounted () {
    scrollToAnchor(this)
  },

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    })
  }
}
</script>
