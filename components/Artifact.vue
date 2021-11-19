<template>
  <div class="artifact" :style="{ left, top, width, height, 'background-color': color }" />
</template>

<script>
// ====================================================================== Import

// ====================================================================== Export
const computedDefaults = {
  left: 0,
  top: 0,
  width: '1rem',
  height: '1rem',
  color: undefined,
  componentName: undefined
}

export default {
  
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
  background-color: $haiti;
}

</style>
