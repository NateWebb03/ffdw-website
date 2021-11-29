<template>
  <header :class="['header', type]">
    <div class="grid-middle">
      <TextBlock
        :block="textBlock"
        class="col-6" />
      <div data-push-left="off-2" class="image-1-container col-4">
        <img :src="image_1" />
      </div>
      <div class="col-4">
        <div class="divider" />
      </div>
    </div>
  </header>
</template>

<script>
// ===================================================================== Imports
import TextBlock from '@/components/TextBlock'

// ====================================================================== Export
export default {
  name: 'HeaderVariant3',

  components: {
    TextBlock
  },

  props: {
    header: {
      type: Object,
      required: true
    }
  },

  computed: {
    type () {
      return this.header.type
    },
    textBlock () {
      return {
        format: 'header',
        label: this.header.heading,
        heading: this.header.subheading
      }
    },
    image_1 () {
      return this.header.image_1
    }
  }
}
</script>

<style lang="scss" scoped>
$artifact_square_dimension: 2.5rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 3rem;
}

// /////////////////////////////////////////////////////////////////// Artifacts
.image-1-container {
  position: relative;

  &:after {
    position: absolute;
    height: $artifact_square_dimension;
    width: $artifact_square_dimension;
    background-color: $greenYellow;
    content: "";
  }
  &:after {
    top: -#{$artifact_square_dimension};
    left: calc(100% - 0.5rem); // far-right, -0.5rem for padding
  }
}
// ///////////////////////////////////////////////////////////////////// Content
img {
  width: 100%;
}

.divider {
  border-bottom: 0.3125rem solid $cararra;
}
</style>
