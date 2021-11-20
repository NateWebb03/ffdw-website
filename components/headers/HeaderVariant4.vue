<template>
  <header :class="['header', type, `subTheme__${subTheme}`]">
    <div class="content grid-middle">
      <div
        data-push-left="off-1"
        class="background col-10"
        :style="{ backgroundImage: `url('${image_1}')` }">
        <div class="background-single-artifact" />
      </div>
      <div class="heading-1 col-4">
        {{ heading }}
      </div>
      <div data-push-left="off-8" class="heading-2 col-4">
        {{ subheading }}
        <div class="subheading-double-artifact" />
      </div>
    </div>
  </header>
</template>

<script>
// ===================================================================== Imports

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
      return this.header.subTheme || 'purple-green'
    },
    image_1 () {
      return this.header.image_1
    }
  }
}
</script>

<style lang="scss" scoped>
$artifact_square_dimension_1: 1.875rem;
$artifact_square_dimension_2: 2.5rem;
$artifact_rectangle_height: 7rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 3rem;
  padding-bottom: 4rem;
}

.content {
  position: relative;
}

.background {
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}

img {
  width: 100%;
  height: 100%;
}

// /////////////////////////////////////////////////////////////////// Artifacts
.heading-1:before,
.heading-1:after,
.heading-2:before,
.heading-2:after,
.subheading-double-artifact:before,
.subheading-double-artifact:after,
.background:before,
.background:after,
.background-single-artifact:before {
  position: absolute;
  content: "";
}

.heading-1:after,
.heading-2:before,
.background:before,
.background:after {
  background: $haiti;
}

.heading-1 {
  &:before,
  &:after {
    top: 100%;
  }
  &:before {
    width: calcToEdge(50%);
    height: $artifact_square_dimension_2;
    right: 50%;
  }

  &:after {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    left: 125%;
  }
}

.heading-2 {
  &:before {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    left: -$artifact_square_dimension_1;
    top: -$artifact_square_dimension_1;
  }
  &:after {
    width: calcToEdge(45%);
    height: $artifact_square_dimension_2;
    top: -$artifact_square_dimension_2;
    left: 55%;
  }
}

.subheading-double-artifact {
  &:before {
    height: $artifact_square_dimension_2;
    width: $artifact_square_dimension_2;
    left: calc(75%);
    top: -($artifact_square_dimension_2 * 2 + $artifact_rectangle_height);
  }
  &:after {
    height: $artifact_rectangle_height;
    width: calcToEdge(calc(25% - #{$artifact_square_dimension_2}));
    top: -($artifact_square_dimension_2 + $artifact_rectangle_height);
    left: calc(75% + #{$artifact_square_dimension_2});
  }
}

.background {
  &:before {
    width: $artifact_square_dimension_2;
    height: $artifact_square_dimension_2;
    left: 0;
    bottom: 0;
  }
  &:after {
    width: $artifact_square_dimension_1;
    height: $artifact_square_dimension_1;
    top: 0;
    right: 0;
  }
}

.background-single-artifact:before {
  width: $artifact_square_dimension_1;
  height: $artifact_square_dimension_1;
  left: -$artifact_square_dimension_1;
  top: 100%;
}
// ///////////////////////////////////////////////////////////////////// Content

.heading-1,
.heading-2 {
  @include title;
  position: relative;
  background: $haiti;
  padding-bottom: 0;
}

.header {
  &.subTheme__purple-green {
    .heading-1:before,
    .heading-2:after {
      background-color: $greenYellow;
    }

    .subheading-double-artifact:before,
    .background-single-artifact:before {
      background-color: $perfume;
    }

    .subheading-double-artifact:after {
      @include gradient_Background_PurpleGreen;
    }
  }

  &.subTheme__red-purple {
    .heading-2:after {
      background-color: $perfume;
    }

    .subheading-double-artifact:before,
    .background-single-artifact:before {
      background-color: $coralRed;
    }
    .heading-1:before {
      @include gradient_Background_RedPurple;
    }
    .subheading-double-artifact:after {
      @include gradient_Background_PurpleRed;
    }
  }

  &.subTheme__red-green {
    .heading-2:after {
      background-color: $greenYellow;
    }

    .subheading-double-artifact:before,
    .background-single-artifact:before {
      background-color: $coralRed;
    }
    .heading-1:before {
      @include gradient_Background_RedGreen;
    }
    .subheading-double-artifact:after {
      @include gradient_Background_GreenRed;
    }
  }
}
.heading-2 {
  margin-top: 14rem;
  padding-left: 1rem;
}
</style>
