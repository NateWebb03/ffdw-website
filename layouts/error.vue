<template>
  <div class="error-page">

    <HeaderSelector :header="header" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import HeaderSelector from '@/components/HeaderSelector'

// ====================================================================== Export
export default {
  name: 'ErrorPage',

  components: {
    HeaderSelector
  },

  head () {
    return this.$CompileSeo(this.$GetSeo())
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    header () {
      return this.siteContent.general.page_404.header
    }
  },

  mounted () {
    this.setPage404(true)
  },

  methods: {
    ...mapActions({
      setPage404: 'global/setPage404'
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
::v-deep .header {
  margin-bottom: 13rem;
  .heading {
    margin-bottom: 1rem;
  }
}
</style>
