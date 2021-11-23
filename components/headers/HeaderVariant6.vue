<template>
  <header :class="['header', type]">
    <div class="grid-middle">
      <div class="col-7">
        <img :src="image_1" />
      </div>
      <div data-push-left="off-5" class="col-7">
        <div class="grid-middle">
          <component :is="headingComponentName" class="col-12" />
          <div data-push-left="off-6" class="col-4">
            <Button :button="buttonBlock" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// ===================================================================== Imports
import HomeText from '@/components/icons/HomeText'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'HeaderVariant6',

  components: {
    HomeText,
    Button
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
    headingComponentName () {
      return this.header.headingComponentName
    },
    image_1 () {
      return this.header.image_1
    },
    image_2 () {
      return this.header.image_2
    },
    image_3 () {
      return this.header.image_3
    },
    buttonBlock () {
      return {
        type: 'B',
        action: 'nuxt-link',
        text: 'Learn More',
        url: '/'
      }
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
  top: -20rem;
}

.image-1 {
  position: absolute;
  top: -3.5rem;
  left: -17%;
  width: 32.1875rem;
}

.image-2 {
  position: absolute;
  top: 13.75rem;
  left: 26.5rem;
  width: 6.25rem;
}

.image-3 {
  position: absolute;
  top: 0;
  left: 49rem;
  width: 10.375rem;
}
</style>
