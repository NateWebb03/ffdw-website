<template>
  <div class="block header-container">
    <div class="bg" :style="{ background }">
      <Artifact v-for="(artifact, artifactKey) in artifacts" :key="artifactKey" v-bind="{ block: artifact}" />
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import Artifact from '@/components/Artifact'

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
    ...['background', 'artifacts'].reduce((acc, val) => (acc[val] = function () { return this.block[val] }) && acc, {})
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.header-container {
  height: 49.5rem;
  width: 100%;

  .bg {
    height: 49.5rem;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
}

</style>
