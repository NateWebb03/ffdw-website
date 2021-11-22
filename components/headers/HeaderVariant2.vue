<template>
  <header :class="['header', type]">
    <div class="grid-middle">
      <component
        :is="headingComponentName"
        class="title"
        data-push-left="off-1" />
    </div>

    <div class="grid-middle images-container">
      <div class="image-1 col-6">
        <img :src="image_1" />
      </div>
      <div class="image-2 col-3" data-push-left="off-6">
        <img :src="image_2" />
      </div>
    </div>
  </header>
</template>

<script>
// ===================================================================== Imports
import ContactText from '@/components/icons/ContactText'

// ====================================================================== Export
export default {
  name: 'HeaderVariant2',

  components: {
    ContactText
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
    heading () {
      return this.header.heading
    },
    headingComponentName () {
      return this.header.headingComponentName
    },
    image_1 () {
      return this.header.image_1
    },
    image_2 () {
      return this.header.image_2
    }
  }
}
</script>

<style lang="scss" scoped>

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 2rem;
  padding-bottom: 1.875rem;
}

// /////////////////////////////////////////////////////////////////// Artifacts

// ///////////////////////////////////////////////////////////////////// Content
img {
  width: 100%;
}

.images-container {
  position: relative;
  top: -27.65rem;
}

.image-1 {
  position: absolute;
  top: 18rem;
  max-width: 26.5rem;
}

.image-2 {
  position: absolute;
  top: -2rem;
  left: 16.5rem;
  max-height: 14rem;
  overflow: hidden;

  > img {
    height: 100%;
  }
}

</style>
