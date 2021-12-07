<template>
  <header :class="['header', type]">

    <div class="artifact-1" />

    <div class="artifact-2" />

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
import HomeHeaderSvg from '@/components/svgs/HomeHeader'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'HeaderVariant6',

  components: {
    HomeHeaderSvg,
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
$artifact_1_dimension: 7rem;
$artifact_square_dimension: 2.5rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  display: flex;
  flex-direction: row;
  max-width: 90rem;
  margin: 0 auto;
  color: $haiti;
}

.artifact-1,
.artifact-2 {
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $haiti;
    z-index: 100;
  }
}

.artifact-1 {
  &:before {
    width: $artifact_1_dimension;
    height: $artifact_1_dimension;
    top: 0;
    right: 0;
  }
  &:after {
    width: $artifact_square_dimension;
    height: $artifact_square_dimension;
    top: $artifact_1_dimension;
    right: $artifact_1_dimension;
  }
}

.artifact-2 {
  &:before,
  &:after {
    height: $artifact_square_dimension;
    right: 0;
  }
  &:before {
    bottom: $artifact_square_dimension;
    width: 16.25rem;
  }
  &:after {
    bottom: 0;
    width: 12rem;
  }
}

.panel-left {
  width: 37%;
  margin-top: -2rem;
  margin-bottom: -3rem;
  img {
    width: 100%;
  }
}

.panel-right {
  width: calc(100% - 37%);
  padding-top: 3rem;
  padding-bottom: $artifact_square_dimension * 2 + 2rem;
  padding-left: calc(#{math.div($containerWidth, 12)});
  padding-right: calc((100% - #{$containerWidth}) / 2);
}

.panel-right-inner-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  svg {
    width: 100%;
  }
  .button {
    margin-top: 3rem;
  }
}
</style>
