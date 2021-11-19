<template>
  <div class="block header-container" :style="{ height }">
    <div class="bg" :style="{ background, height }">
      <Artifact
        v-for="(artifact, artifactKey) in artifacts"
        :key="artifactKey"
        v-bind="{ block: artifact }" />
    </div>

    <div v-if="variant === 'header1'" class="grid header header-1 col-12">
      <h1 class="col-6">
        {{ title }}
      </h1>
      <div class="grid images-container col-6">
        <div v-if="!!images[0]" class="image-1 col-8">
          <img :src="images[0]" />
          <Artifact
            v-bind="{
              block: {
                width: '2.375rem',
                height: '2.375rem',
                top: 'calc(100% - 1rem)', // Subtracting padding
                left: 'calc(-2.375rem / 2 - .65rem)'
              }
            }" />
          <Artifact
            v-bind="{
              block: {
                width: '6.063rem',
                height: '6.313rem',
                top: 'calc(100% - 1.063rem)', // Subtracting padding
                left: 'calc(100% - 6.063rem - 4.188rem)' // Subtracting square width and approx 1 grid space
              }
            }" />
        </div>
        <div v-if="!!images[1]" class="image-2 col-6" data-push-left="off-6">
          <img :src="images[1]" />
          <Artifact
            v-bind="{
              block: {
                width: '2.375rem',
                height: '2.375rem',
                top: '-2.375rem',
                left: 'calc(100% - .55rem)'
              }
            }" />
        </div>
      </div>
    </div>

    <div v-if="variant === 'header2'" class="grid header header-2 col-12">
      header 2
    </div>

    <div v-if="variant === 'header3'" class="grid header header-3 col-12">
      header 3
    </div>

    <div v-if="variant === 'header4'" class="grid header header-4 col-12">
      header 4
    </div>

    <div v-if="variant === 'header5'" class="grid header header-5 col-12">
      header 5
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import Artifact from '@/components/Artifact'

// ====================================================================== Variables
const computedDefaults = {
  // When undefined, the default background is $haiti
  background: undefined,
  // Any additional artifacts, object of shape { left, right, width, height, src }, where src is the component name
  artifacts: undefined,
  // An array of images, interpreted differently depending on the header variant (e.g. variant 1 does a 2 image layout)
  images: [],
  // Height of the header
  height: '39.938rem',
  // Title of the header, interpreted differently depending on the header variant, e.g. header1 is a simple text block
  title: 'Lorem ipsum dolor sit amet',
  // Corresponds directly to the  header options in the XD design
  variant: 'header1' // header1 | header2 | header3 | header4 | header5
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
    ...Object.keys(computedDefaults).reduce(
      (acc, key) =>
        (acc[key] = function () {
          return this.block[key] || computedDefaults[key]
        }) && acc,
      {}
    )
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.header-container {
  width: 100%;
  padding-left: 0;

  .grid {
    position: relative;
    transform: translateY(-1rem); // TODO: Fix sectional padding so this translate won't be necessary
  }

  .bg {
    background: $haiti;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }

  .header {
    color: $haiti;

    &-1 {
      // TODO: Potentially standardize h1 tag
      h1 {
        @include fontSize_Huge;
        @include leading_Huge;
        @include fontWeight_Semibold;

        padding-left: 0;
      }

      .images-container {
        > * {
          display: inline-flex;
        }

        img {
          width: 100%;
          height: auto;
        }

        .image {
          &-1 {
            transform: translateY(-25%);
          }
          &-2 {
            transform: translateY(60%);
            position: absolute;
          }
        }
      }
    }
  }
}
</style>
