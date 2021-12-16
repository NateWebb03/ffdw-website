<template>
  <header :class="['header', type]">

    <div class="grid-middle">
      <div class="col column-left" data-push-left="off-1_sm-0">
        <img :src="image_mobile" class="image-mobile" />
        <ContactHeaderSvg class="desktop" />
        <ContactHeaderSvgMobile class="mobile" />
      </div>
    </div>

    <section class="panel-bottom">
      <div class="grid-middle">

        <div class="col-5_mi-12">
          <img :src="image_1" class="image" />
        </div>

        <div class="col-5_md-6_mi-12" data-push-left="off-2_md-1_mi-0">
          <TextBlock :block="{ description, format: 'medium' }" />
        </div>

      </div>
    </section>

  </header>
</template>

<script>
// ===================================================================== Imports
import TextBlock from '@/components/TextBlock'

import ContactHeaderSvg from '@/components/svgs/ContactHeaderSvg'
import ContactHeaderSvgMobile from '@/components/svgs/ContactHeaderSvgMobile'

// ====================================================================== Export
export default {
  name: 'HeaderVariant2',

  components: {
    TextBlock,
    ContactHeaderSvg,
    ContactHeaderSvgMobile
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
    image_mobile () {
      return this.header.image_mobile
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

.column-left {
  @include customMaxMQ ($containerWidth + 4rem) {
    margin-left: 0;
  }
}

.mobile {
  display: none;
  @include small {
    display: block;
    margin-bottom: 5rem;
  }
}

.desktop {
  @include small {
    display: none;
  }
}

.panel-bottom {
  background-color: $haiti;
  color: $cararra;
}

svg {
  width: 100%;
}

// ///////////////////////////////////////////////////////////////////// Content
.image-mobile {
  display: none;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  @include mini {
    display: block;
  }
}

.image {
  width: 100%;
  margin-top: -10rem;
  @include customMaxMQ ($containerWidth + 4rem) {
    margin-top: -15rem;
  }
  @include small {
    margin-top: -5rem;
  }
  @include mini {
    width: 100%;
  }
}

.text-block {
  margin-top: 7rem;
  @include mini {
    margin-top: 3rem;
  }
}
</style>
