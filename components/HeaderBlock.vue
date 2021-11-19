<template>
  <div class="block header-container" :style="{ height }">
    <div class="bg" :style="{ background, height }">
      <Artifact v-for="(artifact, artifactKey) in artifacts" :key="artifactKey" v-bind="{ block: artifact}" />
    </div>

    <div class="grid">
      
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import Artifact from '@/components/Artifact'

// ====================================================================== Variables
const computedDefaults = {
  background: undefined,
  artifacts: undefined,
  images: undefined,
  height: '49.5rem',
  title: 'Lorem Ipsum'
}

// ====================================================================== Export
export default {
  name: 'HeaderBlock',

  components: {
    Artifact
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
.header-container {
  width: 100%;

  .bg {
    background: $haiti;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
}

</style>
