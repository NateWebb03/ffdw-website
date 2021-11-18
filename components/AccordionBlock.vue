<template>
  <div :class="['block accordion-block', `theme__${theme}`]">

    <Zero_Core__Accordion v-slot="{ active }">
      <Zero_Core__Accordion_Section
        v-for="(section, index) in sections"
        :key="index"
        :active="active">

        <Zero_Core__Accordion_Header>
          <div class="label">
            {{ section.label }}
          </div>
        </Zero_Core__Accordion_Header>

        <Zero_Core__Accordion_Content>
          <div class="accordion-content-wrapper" v-html="section.content"></div>
        </Zero_Core__Accordion_Content>

      </Zero_Core__Accordion_Section>
    </Zero_Core__Accordion>

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'AccordionBlock',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    sections () {
      return this.block.sections
    },
    theme () { // 'purple-green', 'red-purple', 'red-green'
      return this.block.theme || 'purple-green'
    }
  }
}
</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////////// Themes
.theme__purple-green {
  .accordion-section {
    &:before, &:after {
      @include gradient_Background_PurpleGreen;
    }
  }
}

.theme__red-purple {
  .accordion-section {
    &:before, &:after {
      @include gradient_Background_RedPurple;
    }
  }
}

.theme__red-green {
  .accordion-section {
    &:before, &:after {
      @include gradient_Background_RedGreen;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Section
.accordion-section {
  &:before,
  &:after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background: $cararra;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
  &:first-child:before,
  &:after {
    content: '';
  }
}

// ////////////////////////////////////////////////////////////////////// Header
.accordion-header {
  @include p1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 2rem 2rem 0;
  cursor: pointer;
}

// ///////////////////////////////////////////////////////////////////// Content
::v-deep .accordion-content-wrapper {
  padding-bottom: 2rem;
}
</style>
