<template>
  <header :class="['header', type]">

    <div class="panel-left">
      <img :src="image_1" />
    </div>

    <div class="panel-right">
      <div class="panel-right-inner-content">
        <component :is="headingComponentName" />
        <Button :button="buttonBlock" />
      </div>
    </div>

  </header>
</template>

<script>
// ===================================================================== Imports
import HomeText from '@/components/HomeText'
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
  display: flex;
  flex-direction: row;
  max-width: 90rem;
  margin: 0 auto;
  color: $haiti;
}

.panel-left {
  width: 37%;
  margin-bottom: -3rem;
  img {
    width: 100%;
  }
}

.panel-right {
  width: calc(100% - 37%);
  padding-left: calc(#{math.div($containerWidth, 12)});
  padding-right: calc((100vw - #{$containerWidth}) / 2);
}

// /////////////////////////////////////////////////////////////////// Artifacts

// ///////////////////////////////////////////////////////////////////// Content
</style>
