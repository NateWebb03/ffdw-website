<template>
  <div class="home-callout">

    <div class="panel-left">
      <img :src="img_left" />
    </div>

    <div class="panel-right">
      <div class="panel-right-inner-content">

        <TextBlock :block="textBlock" />

        <div class="logo-list">
          <div
            v-for="(logo, index) in logos"
            :key="index"
            class="logo-container">
            <img :src="logo" />
          </div>
        </div>

        <Button v-if="cta" :button="cta" />

      </div>
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import TextBlock from '@/components/TextBlock'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'ExploreCallout',

  components: {
    TextBlock,
    Button
  },

  props: {
    img_left: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    },
    label: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    text: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    logos: {
      type: [Array, Boolean],
      required: false,
      default: false
    },
    cta: {
      type: [Object, Boolean],
      required: false,
      default: false
    }
  },

  computed: {
    textBlock () {
      return {
        format: 'header',
        label: this.label,
        heading: this.text
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.home-callout {
  display: flex;
  flex-direction: row;
  max-width: 90rem;
  margin: 0 auto;
  color: $haiti;
}

.panel-left {
  width: 45%;
  @include small {
    display: none;
  }
  img {
    width: 100%;
  }
}

.panel-right {
  @include gradient_Background_RedGreen;
  position: relative;
  width: 55%;
  margin-top: -2rem;
  margin-bottom: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: calc(#{math.div($containerWidth, 12)} + 2rem);
  padding-right: calc((100vw - #{$containerWidth}) / 2);
  @include small {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding-right: calc(#{math.div($containerWidth, 12)} + 2rem);
  }
  @include tiny {
    padding: 3rem;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $haiti;
  }
  &:before {
    width: 7.25rem;
    height: 7.25rem;
    top: 0;
    right: 0;
    @include mini {
      width: 3rem;
      height: 3rem;
    }
  }
  &:after {
    width: 2.5rem;
    height: 2.5rem;
    top: 7.25rem;
    right: 7.25rem;
    @include mini {
      width: 1.25rem;
      height: 1.25rem;
      top: 3rem;
      right: 3rem;
    }
  }
}

.social-icons,
.logo-list {
  margin-top: 3rem;
}

.logo-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(50% - 4.5rem);
  margin-bottom: 4rem;
  &:nth-child(odd) {
    margin-right: 7rem;
  }
  img {
    width: 100%;
  }
}

.button {
  @include fontSize_Mini;
  @include fontWeight_Semibold;
  border: 2px solid $haiti;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  line-height: 1;
  &:hover {
    color: $cararra;
    background-color: $haiti;
  }
}
</style>
