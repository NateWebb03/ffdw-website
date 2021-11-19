<template>
  <div class="block nav-container">
    <div class="nav-content">
      <FFDWLogo />
      <nav class="nav-links">
        <Button
          v-for="(link, index) in links"
          :key="`nav-link-${index}`"
          :button="link"
          class="nav-link">
          {{ link.text }}
        </Button>
      </nav>
    </div>
    <div class="nav-breadcrumbs">
      Home > Lorem Ipsum
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import FFDWLogo from '@/components/icons/FFDWLogo'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'NavBlock',

  components: {
    FFDWLogo,
    Button
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    // Simple mapped variables
    ...[].reduce((acc, val) => (acc[val] = function () { return this.block[val] }) && acc, {}),
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    links () {
      return this.siteContent.general.navigation
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.nav-container {
  width: 100%;
  max-width: 58.75rem;
  position: absolute;
  z-index: 1;
  top: 2.313rem;
  color: $haiti;

  .nav-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    a {
      @include fontSize_Mini;
      padding-top: 1.625rem;

      &:not(:last-child) {
        margin-right: 1.875rem;
      }
    }
  }

  .nav-breadcrumbs {
    @include fontSize_Tiny;
    padding-top: 1.438rem;
  }
}

</style>
