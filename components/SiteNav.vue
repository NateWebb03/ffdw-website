<template>
  <div :class="`site-nav theme__${theme}`">

    <div class="grid">
      <div class="col">

        <div class="content">

          <Button :button="logoButton" class="logo-button">
            <FFDWLogo class="logo" />
          </Button>

          <Navigation :theme="theme" />

        </div>

      </div>
    </div>

    <div class="grid-noGutter">
      <div class="col">

        <Breadcrumbs />

      </div>
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import FFDWLogo from '@/components/icons/FFDWLogo'
import Button from '@/components/Button'
import Navigation from '@/components/Navigation'
import Breadcrumbs from '@/components/Breadcrumbs'

// ====================================================================== Export
export default {
  name: 'NavBlock',

  components: {
    FFDWLogo,
    Button,
    Navigation,
    Breadcrumbs
  },

  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    content () {
      return this.siteContent.general
    },
    links () {
      return this.content.navigation
    },
    logoButton () {
      return this.content.logo_button
    }
  }
}
</script>

<style lang="scss" scoped>
$iconDimension: 1.5rem;

// ///////////////////////////////////////////////////////////////////// General
.site-nav {
  position: relative;
  padding: 2.5rem 0;
  color: $haiti;
  z-index: 1000;
  &.theme__light {
    color: $cararra;
  }
}

.logo {
  width: 15.5rem;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @include customMaxMQ (80rem) {
    padding-right: 5rem;
  }
}

.breadcrumbs {
  margin-top: 1rem;
}
</style>
