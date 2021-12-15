<template>
  <header :class="['header', type]">
    <div class="grid-middle">

      <div class="col-5_sm-10_ti-12">
        <div class="panel-left">

          <h1 class="heading h1">
            {{ heading }}
          </h1>

          <Button v-if="headerCta" :button="cta" />

        </div>
      </div>

      <div class="col-4_sm-6_ti-8 image-1" data-push-left="off-1_sm-0">
        <div class="image-1-container">
          <img :src="image_1" />
        </div>
      </div>

      <div class="col-3_sm-5_ti-7 image-2">
        <div class="image-2-container">
          <img :src="image_2" />
          <Button v-if="cta && !headerCta" :button="cta" />
        </div>
      </div>

    </div>
  </header>
</template>

<script>
// ===================================================================== Imports
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'HeaderVariant1',

  components: {
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
    heading () {
      return this.header.heading
    },
    image_1 () {
      return this.header.image_1
    },
    image_2 () {
      return this.header.image_2
    },
    cta () {
      return this.header.cta
    },
    headerCta () {
      if (typeof this.cta === 'object') {
        return this.cta.layout === 'heading-cta'
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
$artifact_1_general_dimension: 3.125rem;
$artifact_1_width: 20rem;
$artifact_square_dimension: 2.5rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  position: relative;
  padding-top: 3rem;
  padding-bottom: 5rem;
  color: $haiti;
}

// /////////////////////////////////////////////////////////////////// Artifacts
.header:before,
.header:after,
.image-1-container:before,
.image-1-container:after,
.image-2-container:after {
  content: '';
  position: absolute;
  background-color: $haiti;
}

.header {
  &:before,
  &:after {
    height: $artifact_1_general_dimension;
    width: $artifact_1_width;
  }
  &:before {
    bottom: $artifact_1_general_dimension;
    left: calc(50% - #{math.div($containerWidth, 2)} - #{$artifact_1_width});
  }
  &:after {
    bottom: 0;
    left: calc(50% - #{math.div($containerWidth, 2)} - #{$artifact_1_width} + #{$artifact_1_general_dimension});
  }
}

.image-1-container {
  &:before {
    top: 100%;
    right: 100%;
    width: $artifact_square_dimension;
    height: $artifact_square_dimension;
    @include small {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  &:after {
    top: 100%;
    right: calc(#{math.div($containerWidth, 12)} - 1rem); // same offset as margin-left of .image-2, -1rem for col padding
    height: calc(1rem + 5rem); // 1rem = pad-bottom of col, 4rem = pad-bottom of .header
    width: calc(1rem + 4rem); // make it square
    @include medium {
      height: 10rem;
    }
  }
}

.image-2-container {
  &:after {
    bottom: 100%;
    left: 100%;
    width: $artifact_square_dimension;
    height: $artifact_square_dimension;
    @include small {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Content
img {
  width: 100%;
}

.heading {
  font-size: 3.75rem;
  @include medium {
    @include fontSize_ExtraLarge;
    @include leading_ExtraLarge;
  }
  @include small {
    @include fontSize_MediumLarge;
    line-height: 3.125rem; // 50pt
  }
}

.image-1-container,
.image-2-container {
  position: relative;
}

.image-1-container {
  z-index: 5;
}

.image-2-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
}

.image-1 {
  margin-top: -7rem;
  @include small {
    margin-top: 3rem;
  }
}

.image-2 {
  margin-left: math.div(-$containerWidth, 12);
  margin-bottom: -25rem;
}

::v-deep .button.type__D {
  text-transform: none;
  .icon-after.arrow-down {
    svg {
      width: 0.75rem;
      transform: rotate(-90deg);
      rect {
        fill: $cararra;
      }
    }
  }
}
</style>
