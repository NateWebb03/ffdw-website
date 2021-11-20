<template>
  <div :class="['block text-block', `format__${format}`, `theme__${theme}`]" :data-id="dataIdAttribute">

    <div v-if="label" class="label">
      <span
        v-if="typeof label === 'string'"
        class="label-textual">
        {{ label }}
      </span>
      <Button
        v-if="typeof label === 'object'"
        :button="label"
        class="label-textual" />
    </div>

    <div v-if="date" class="date">
      {{ date }}
    </div>

    <component
      :is="headingLevel"
      v-if="heading"
      :class="['heading', headingLevel]"
      v-html="heading" />

    <div
      v-if="subheading"
      class="subheading"
      v-html="subheading">
    </div>

    <div
      v-if="description"
      class="description"
      v-html="description">
    </div>

    <div
      v-if="ctas && Array.isArray(ctas)"
      class="button-row">

      <Button
        v-for="(cta, index) in ctas"
        :key="index"
        :button="cta" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'TextBlock',

  components: {
    Button
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    format () {
      return this.block.format || 'medium'
    },
    theme () { // 'purple-green', 'green-purple', 'red-purple', 'red-green'
      return this.block.theme || 'purple-green'
    },
    buttonTheme () {
      return this.block.button_theme
    },
    label () {
      const label = this.block.label
      if (typeof label === 'object') { label.theme = this.buttonTheme }
      return label
    },
    date () {
      if (this.block.date) {
        const date = this.$moment.utc(new Date(this.block.date))
        return `${date.format('MMMM D YYYY')}`
      }
      return false
    },
    heading () {
      return this.block.heading
    },
    headingLevel () {
      const format = this.format
      let size
      switch (format) {
        case 'header' : size = 'h1'; break
        case 'medium' : size = 'h2'; break
        case 'small' : size = 'h3'; break
        default : size = 'h2'
      }
      return size
    },
    subheading () {
      return this.block.subheading
    },
    description () {
      return this.block.description
    },
    ctas () {
      if (!this.block.ctas) { return undefined }
      return this.block.ctas.map(cta => ({ ...cta, theme: this.buttonTheme || cta.theme }))
    },
    dataIdAttribute () {
      return this.block.data_id
    }
  }
}
</script>

<style lang="scss" scoped>
// //////////////////////////////////////////////////////////// General & Themes
.text-block {
  position: relative;
  &.theme__green-purple {
    ::v-deep .description {
      a {
        @include gradient_Background_GreenPurple;
        @include fontWeight_Bold;
        background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        text-fill-color: transparent;
      }
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Formats
.format__medium {
  .description {
    padding-right: 10rem;
  }
}

// ///////////////////////////////////////////////////////////////////// Content
.label {
  @include label_2;
  margin-bottom: 7rem;
}

.heading {
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
}

::v-deep .description {
  @include p3;
}
</style>
