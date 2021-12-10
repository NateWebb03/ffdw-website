sub-theme__<template>
  <header :class="['header', type, `sub-theme__${subTheme}`]">
    <div class="grid-middle-center">
      <div class="col-10_md-12">
        <div class="content">

          <div class="heading heading-1">
            {{ heading }}
          </div>

          <div class="heading heading-2">
            <div class="heading-2-artifact" />
            {{ subheading }}
          </div>

          <div class="content-artifacts-1" />

          <div class="content-artifacts-2" />

          <img
            class="image desktop"
            :src="image_1" />

          <div
            class="image mobile"
            :style="{ backgroundImage: `url(${image_1})` }" />

        </div>
      </div>
    </div>
  </header>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'HeaderVariant4',

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
    subheading () {
      return this.header.subheading
    },
    subTheme () {
      // 'purple-green', 'red-purple', 'red-green'
      return this.header.sub_theme || 'purple-green'
    },
    image_1 () {
      return this.header.image_1
    }
  }
}
</script>

<style lang="scss" scoped>
$artifact_square_small: 1.875rem;
$artifact_square_large: 2.5rem;

$gutter: calc((100vw - #{$containerWidth}) / 2);
$gutterMobile: calc(100vw * 0.07);
$singleColumn: math.div($containerWidth, 12);

@mixin artifactSquare_Small {
  width: $artifact_square_small;
  height: $artifact_square_small;
  background-color: $haiti;
}

@mixin artifactSquare_Large {
  width: $artifact_square_large;
  height: $artifact_square_large;
  background-color: $haiti;
}

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 3rem;
  padding-bottom: 4rem;
  &.sub-theme__red-purple {
    .content-artifacts-1:after {
      background-color: $coralRed;
    }
    .heading-1:after {
      @include gradient_Background_RedPurple;
    }
    .heading-2:after {
      background-color: $perfume;
    }
    .heading-2-artifact {
      @include gradient_Background_PurpleRed;
      &:after {
        background-color: $coralRed;
      }
    }
  }
  &.sub-theme__red-green {
    .content-artifacts-1:after {
      background-color: $coralRed;
    }
    .heading-1:after {
      @include gradient_Background_RedGreen;
    }
    .heading-2:after {
      background-color: $greenYellow;
    }
    .heading-2-artifact {
      @include gradient_Background_GreenRed;
      &:after {
        background-color: $coralRed;
      }
    }
  }
}

.content {
  position: relative;
}

.heading {
  @include fontSize_Huge;
  @include fontWeight_Extrabold;
  line-height: 1;
  position: absolute;
  padding: 1.5rem;
  background-color: $haiti;
  @include mini {
    @include fontSize_MediumLarge;
  }
}

.image {
  width: 100%;
  &.desktop {
    @include small {
      display: none;
    }
  }
  &.mobile {
    display: none;
    padding-top: 100%;
    background-size: cover;
    background-position: -10rem;
    @include small {
      display: block;
    }
    @include mini {
      padding-top: 150%;
    }
  }
}

.heading-1 {
  top: 0;
  left: -3rem;
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    right: 50%;
    width: calc(50% + #{$gutter} + #{$singleColumn} + 0.5rem - 3rem);
    height: $artifact_square_large;
    @include customMaxMQ ($containerWidth + 4rem) {
      width: calc(50% + #{$gutterMobile} + #{$singleColumn} - 3rem);
    }
    @include medium {
      width: calc(50% + #{$gutterMobile} + 0.5rem - 3rem);
    }
  }
}

.heading-2 {
  bottom: 0;
  right: -3rem;
  &:before,
  &:after {
    content: '';
    position: absolute;
  }
  &:before {
    @include artifactSquare_Small;
    bottom: calc(100% - 0.5rem);
    right: calc(100% - 0.5rem);
  }
  &:after {
    bottom: 100%;
    left: calc(100% - 7rem);
    width: calc(7rem + #{$gutter} + #{$singleColumn} + 0.5rem - 3rem);
    height: $artifact_square_large;
    @include customMaxMQ ($containerWidth + 4rem) {
      width: calc(7rem + #{$gutterMobile} + #{$singleColumn} - 3rem);
    }
    @include medium {
      width: calc(7rem + #{$gutterMobile} + 0.5rem - 3rem);
    }
  }
}

.content-artifacts-1,
.content-artifacts-2,
.heading-2-artifact {
  position: absolute;
  &:after {
    content: '';
    position: absolute;
  }
}

.content-artifacts-1 {
  @include artifactSquare_Large;
  bottom: 0;
  left: 0;
  &:after {
    top: 100%;
    left: 0;
    width: inherit;
    height: inherit;
  }
}

.content-artifacts-2 {
  @include artifactSquare_Small;
  top: 0;
  right: 0;
  &:after {
    top: 100%;
    right: 100%;
    width: inherit;
    height: inherit;
    background-color: inherit;
  }
}

.heading-2-artifact {
  left: calc(100% - 0.5rem);
  bottom: calc(100% + #{$artifact_square_large});
  width: calc(#{$gutter} + #{$singleColumn} + 1rem - 3rem);
  height: 7rem;
  @include customMaxMQ ($containerWidth + 4rem) {
    width: calc(#{$gutterMobile} + #{$singleColumn} + 0.5rem - 3rem);
  }
  @include medium {
    width: calc(#{$gutterMobile} - 2rem);
  }
  @include small {
    left: calc(100% - 3rem);
    width: calc(#{$gutterMobile} + 0.5rem);
  }
  &:after {
    @include artifactSquare_Large;
    bottom: 100%;
    right: 100%;
  }
}
</style>
