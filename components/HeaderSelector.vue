<template>
  <div :class="[`header-selector theme__${theme} font-theme__${fontTheme}`]">

    <NavBlock />

    <component :is="headerVariant" :header="header" />

  </div>
</template>

<script>
// ===================================================================== Imports
import NavBlock from '@/components/NavBlock'
import HeaderVariant1 from '@/components/headers/HeaderVariant1'
import HeaderVariant2 from '@/components/headers/HeaderVariant2'
import HeaderVariant3 from '@/components/headers/HeaderVariant3'
import HeaderVariant4 from '@/components/headers/HeaderVariant4'
import HeaderVariant5 from '@/components/headers/HeaderVariant5'
import HeaderVariant6 from '@/components/headers/HeaderVariant6'

// ====================================================================== Export
export default {
  name: 'HeaderSelector',

  components: {
    NavBlock,
    HeaderVariant1,
    HeaderVariant2,
    HeaderVariant3,
    HeaderVariant4,
    HeaderVariant5,
    HeaderVariant6
  },

  props: {
    header: {
      type: Object,
      required: true
    }
  },

  computed: {
    headerVariant () {
      return `HeaderVariant${this.header.type.split('_')[1]}`
    },
    theme () { // 'purple-green', 'red-purple', 'red-green'
      return this.header.theme
    },
    fontTheme () { // 'dark', 'light'
      return this.header.font_theme || 'dark'
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.header-selector {
  position: relative;
  &.theme__purple-green-a {
    @include gradient_Background_PurpleGreen;
  }
  &.theme__purple-green-b {
    background: linear-gradient(to right, $perfume 40%, $greenYellow);
  }
  &.theme__red-purple {
    @include gradient_Background_RedPurple;
  }
  &.theme__red-green {
    @include gradient_Background_RedGreen;
  }
  &.font-theme__dark {
    color: $haiti;
  }
  &.font-theme__light {
    color: $cararra;
  }
}
</style>
