<template>
  <header :class="['header', type, `subTheme__${subTheme}`]">
    <div class="grid">
      <div class="col-8_mi-12" data-push-left="off-2_mi-0">
        <div class="inner-wrapper">
          <TextBlock
            class="content"
            v-bind="{
              block: {
                heading,
                description,
                format: 'header',
              },
            }" />
          <div class="artifact-gradient" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// ===================================================================== Imports
import TextBlock from '@/components/TextBlock'

// ====================================================================== Export
export default {
  name: 'HeaderVariant5',

  components: {
    TextBlock
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
    description () {
      return this.header.description
    },
    subTheme () {
      // 'purple-green', 'red-green'
      return this.header.subTheme || 'purple-green'
    }
  }
}
</script>

<style lang="scss" scoped>
$artifact_square_dimension_1: 2.5rem;
$artifact_rectangle_gap: 7.125rem;
$artifact_rectangle_width_1: $artifact_square_dimension_1 * 4 + 1rem;
$artifact_gradient_height: 7rem;
$artifact_gradient_width: $artifact_rectangle_gap - $artifact_square_dimension_1 - 0.5rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding: 9rem 0;
  position: relative;
}

.content,
.inner-wrapper,
.artifact-gradient {
  position: relative;
}

// /////////////////////////////////////////////////////////////////// Artifacts
.content:before,
.content:after,
.inner-wrapper:before,
.inner-wrapper:after,
.artifact-gradient:before {
  position: absolute;
  content: "";
}

.inner-wrapper {
  &:before {
    width: calcToEdge(calc(30% + 1rem));
    min-width: 10%;
    height: $artifact_square_dimension_1;
    right: 100%;
    bottom: calc(100% + #{$artifact_square_dimension_1});
  }
  @include medium {
    &:before {
      width: 100%;
    }
  }

  &:after {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    right: calc(100% - #{$artifact_square_dimension_1});
    top: -$artifact_square_dimension_1 * 3;
  }
}

.content {
  &:before {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    right: -$artifact_square_dimension_1 * 2;
    bottom: -$artifact_square_dimension_1 * 2;
  }
  &:after {
    width: calcToEdge($artifact_rectangle_width_1);
    min-width: $artifact_rectangle_width_1;
    height: $artifact_square_dimension_1;
    left: calc(100% + #{$artifact_square_dimension_1 * 2});
  }
}

.artifact-gradient:before {
  width: calcToEdge($artifact_gradient_width);
  min-width: $artifact_gradient_width;
  height: $artifact_gradient_height;
  left: calc(100% + #{$artifact_square_dimension_1 * 2 + $artifact_rectangle_gap});
  top: -$artifact_gradient_height;
}

// ///////////////////////////////////////////////////////////////////// Content

.header {
  &.subTheme__purple-green {
    .inner-wrapper:before,
    .content:after {
      background-color: $greenYellow;
    }

    .inner-wrapper:after,
    .content:before {
      background-color: $perfume;
    }

    .artifact-gradient:before {
      @include gradient_Background_PurpleGreen;
    }
  }
  &.subTheme__red-green {
    .inner-wrapper:before,
    .content:after {
      background-color: $greenYellow;
    }

    .inner-wrapper:after,
    .content:before {
      background-color: $coralRed;
    }

    .artifact-gradient:before {
      @include gradient_Background_RedGreen;
    }
  }
}
</style>
