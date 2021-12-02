<template>
  <div :class="['block nav-container']">

    <div class="grid">
      <div class="col">

        <div class="content">

          <FFDWLogo class="logo" />

          <nav class="links">
            <Button
              v-for="(link, index) in links"
              :key="`nav-link-${index}`"
              :button="link"
              class="nav-link" />
          </nav>

        </div>

      </div>
    </div>

    <!-- <div v-if="!!currentPage" class="grid">
      <div class="col-6">

        <div class="breadcrumbs">
          Home > Lorem Ipsum
        </div>

      </div>
    </div> -->

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
$iconDimension: 1.5rem;

// ///////////////////////////////////////////////////////////////////// General
.nav-container {
  position: relative;
  padding: 2.5rem 0;
  z-index: 1;
}

.logo {
  width: 15.5rem;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
}

::v-deep .nav-link {
  @include fontSize_Mini;
  @include fontWeight_Semibold;
  &:not(:last-child) {
    margin-right: 1.875rem;
  }
  &:not(.nuxt-link-active ):hover {
    padding-bottom: $iconDimension;
    .icon-after.finger-up {
      opacity: 1;
      transform: translateY(-$iconDimension);
    }
  }
  &.nuxt-link-active {
    .icon-before.star {
      opacity: 1;
    }
  }
  .icon-before.star,
  .icon-after.finger-up {
    position: absolute;
    left: calc(50% - #{math.div($iconDimension, 2)});
    width: $iconDimension;
    opacity: 0;
    path {
      fill: $cararra;
    }
  }
  .icon-before.star {
    bottom: 100%;
  }
  .icon-after.finger-up {
    top: 100%;
  }
}

.breadcrumbs {
  margin-top: 1rem;
}
</style>
