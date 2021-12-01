<template>
  <div :class="['block nav-container']">

    <div class="grid">
      <div class="col">

        <div class="content">

          <FFDWLogo />

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
// ///////////////////////////////////////////////////////////////////// General
.nav-container {
  position: relative;
  padding: 2.5rem 0;
  z-index: 1;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  @include fontSize_Mini;
  @include fontWeight_Semibold;
  &:not(:last-child) {
    margin-right: 1.875rem;
  }
}

.breadcrumbs {
  margin-top: 1rem;
}
</style>
