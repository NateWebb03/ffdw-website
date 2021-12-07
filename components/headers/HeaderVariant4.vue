sub-theme__<template>
  <header :class="['header', type, `sub-theme__${subTheme}`]">
    <div class="content grid-middle">
      <div class="col-10" data-push-left="off-1">
        <div class="background-double-artifacts">
          <img :src="image_1" />
          <div class="background-single-artifact" />
          <div class="subheading-double-artifact" />
        </div>
      </div>
      <div class="heading-1">
        {{ heading }}
      </div>
      <div data-push-left="off-8" class="heading-2">
        {{ subheading }}
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
$artifact_square_dimension_1: 1.875rem;
$artifact_square_dimension_2: 2.5rem;
$artifact_rectangle_height: 7rem;

// ///////////////////////////////////////////////////////////////////// General
.header {
  padding-top: 3rem;
  padding-bottom: 4rem;
}

.content,
.background-double-artifacts,
.background-single-artifact,
.subheading-double-artifact {
  position: relative;
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
.background-double-artifacts:before,
.background-double-artifacts:after,
.background-single-artifact:before {
  position: absolute;
  content: "";
}

.heading-1:after,
.heading-2:before,
.background-double-artifacts:before,
.background-double-artifacts:after {
  background: $haiti;
}

.heading-1 {
  &:before,
  &:after {
    top: 100%;
  }
  &:before {
    width: calcToEdge(66%);
    height: $artifact_square_dimension_2;
    right: 34%;
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
    width: calcToEdge(calc(45% + 0.5rem));
    height: $artifact_square_dimension_2;
    top: -$artifact_square_dimension_2;
    left: calc(55%);
  }
}

.subheading-double-artifact {
  left: 25%;
  bottom: 5.4375rem;
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

.background-double-artifacts {
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
  position: absolute;
  background: $haiti;
  padding-bottom: 0;
}
.header {
  &.sub-theme__purple-green {
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

  &.sub-theme__red-purple {
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

  &.sub-theme__red-green {
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
.heading-1 {
  top: 0;
  padding-right: 1rem;
}
.heading-2 {
  bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
