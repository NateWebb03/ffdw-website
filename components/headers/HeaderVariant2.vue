<template>
  <header :class="['header', type]">

    <div class="grid-middle">
      <div class="col" data-push-left="off-1">
        <component :is="headingComponentName" />
      </div>
    </div>

    <section class="panel-bottom">
      <div class="grid-middle">

        <div class="col-5">
          <img :src="image_1" class="image" />
        </div>

        <div class="col-5" data-push-left="off-2">
          <TextBlock :block="{ description, format: 'medium' }" />
        </div>

      </div>
    </section>

  </header>
</template>

<script>
// ===================================================================== Imports
import TextBlock from '@/components/TextBlock'
import ContactHeaderSvg from '@/components/svgs/ContactHeader'

// ====================================================================== Export
export default {
  name: 'HeaderVariant2',

  components: {
    TextBlock,
    ContactHeaderSvg
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
    description () {
      return this.header.description
    }
  }
}
</script>

<style lang="scss" scoped>

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 2rem;
}

.panel-bottom {
  background-color: $haiti;
  color: $cararra;
}

// ///////////////////////////////////////////////////////////////////// Content
.image {
  width: 100%;
  margin-top: -10rem;
}

.text-block {
  margin-top: 7rem;
}
</style>
