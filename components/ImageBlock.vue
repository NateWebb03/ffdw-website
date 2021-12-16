<template>
  <div v-if="src" class="block image-block">

    <img :src="src" class="image" />

    <div v-if="label" class="label">
      {{ label }}
    </div>

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'ImageBlock',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    src () {
      return this.block.src
    },
    label () {
      return this.block.label
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.image-block {
  position: relative;
}

.image {
  display: block;
  width: 100%;
}

.label {
  @include label_2;
  text-align: center;
  margin-top: 2rem;
  @include mini {
    font-size: 0.75rem;
  }
}
</style>
