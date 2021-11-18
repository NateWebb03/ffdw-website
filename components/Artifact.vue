<template>
  <component class="artifact" :is="src" :style="{ left, top, width, height }" />
</template>

<script>
// ====================================================================== Import
import Info from '@/components/icons/Info'
import Ticket from '@/components/icons/Ticket'

// ====================================================================== Export
const computedDefaults = {
  left: 0,
  right: 0,
  width: '1rem',
  height: '1rem',
  src: null
}

export default {
  name: 'Artifact',
  components: {
    Info,
    Ticket
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    // Simple mapped variables
    ...Object.keys(computedDefaults)
      .reduce((acc, key) => (acc[key] = function () { return this.block[key] || computedDefaults[key] }) && acc, {})
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.artifact {
  position: absolute;
}

</style>
