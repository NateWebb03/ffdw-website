<template>
  <header :class="['header', type, `subTheme__${subTheme}`, 'grid']">
    <TextBlock
      class="content col-9"
      data-push-left="off-1"
      v-bind="{
        block: {
          heading,
          description,
          format: 'header',
        },
      }" />
    <div class="artifact-gradient col-3" />
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
$artifact_rectangle_height: 7rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding: 5.25rem 0 4rem;
  position: relative;
}

.content {
  position: relative;
}

// /////////////////////////////////////////////////////////////////// Artifacts
.content:before,
.content:after,
.header:before,
.header:after,
.artifact-gradient:before {
  position: absolute;
  content: "";
}

.header {
  &:before {
    width: calcToEdge(17.5%);
    min-width: 17.5%;
    height: $artifact_square_dimension_1;
    right: 82.5%;
    top: 0;
  }

  &:after {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    right: calc(82.5% - #{$artifact_square_dimension_1});
    top: -$artifact_square_dimension_1;
  }
}

.content {
  &:before {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    right: -$artifact_square_dimension_1 * 2;
    bottom: -$artifact_square_dimension_1;
  }
  &:after {
    width: calcToEdge($artifact_square_dimension_1 * 2 + 1rem);
    height: $artifact_square_dimension_1;
    left: calc(100% + #{$artifact_square_dimension_1 * 2});
    bottom: 0;
  }
}

.artifact-gradient:before {
  width: calcToEdge(-$artifact_square_dimension_1 * 2);
  min-width: 17.5%;
  height: $artifact_rectangle_height * 2;
  left: calc(100% + #{$artifact_square_dimension_1 * 2});
  bottom: $artifact_square_dimension_1 * 3;
}

// ///////////////////////////////////////////////////////////////////// Content

.header {
  &.subTheme__purple-green {
    &:before,
    .content:after {
      background-color: $greenYellow;
    }

    &:after,
    .content:before {
      background-color: $perfume;
    }

    .artifact-gradient:before {
      @include gradient_Background_PurpleGreen;
    }
  }
  &.subTheme__red-green {
    &:before,
    .content:after {
      background-color: $greenYellow;
    }

    &:after,
    .content:before {
      background-color: $coralRed;
    }

    .artifact-gradient:before {
      @include gradient_Background_RedGreen;
    }
  }
}
</style>
