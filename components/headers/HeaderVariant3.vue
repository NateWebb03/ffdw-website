<template>
  <header :class="['header', type]">
    <div class="grid">

      <div class="col-6_sm-10_mi-12">
        <TextBlock :block="textBlock" />
      </div>

      <div class="col-4_sm-6_mi-8" data-push-left="off-2_sm-0">
        <div class="panel-right">
          <img :src="image_1" />
        </div>
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
$offset: calc(7rem + 35px); // margin-bottom + line-height from .text-block label

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 3rem;
}

[class~="grid"],
[class*="grid-"],
[class*="grid_"] {
  @include small {
    flex-direction: column-reverse;
  }
}

.text-block {
  @include small {
    margin-top: 3rem;
  }
}

.panel-right {
  position: relative;
  padding-top: $offset;
  @include small {
    padding-top: 0;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: calc(100% - #{$offset});
    left: 100%;
    height: $artifact_square_dimension;
    width: $artifact_square_dimension;
    background-color: $greenYellow;
  }
}

// ///////////////////////////////////////////////////////////////////// Content
img {
  width: 100%;
}
</style>
