<template>
  <div
    :class="['block text-block', `format__${format}`, `theme__${theme}`]"
    :data-id="dataIdAttribute">
    <component :is="icon" v-if="!!icon" class="icon" />

    <div v-if="label" class="label">
      <span v-if="typeof label === 'string'" class="label-textual">
        {{ label }}
      </span>
      <Button
        v-if="typeof label === 'object'"
        :button="label"
        class="label-textual" />
    </div>

    <div v-if="date" class="date">
      {{ date }}
      <div v-if="tags.length" class="tags">
        <span v-for="tag in tags" :key="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div v-if="heading" :class="['heading', headingLevel]" v-html="heading" />

    <div v-if="subheading" class="subheading" v-html="subheading" />

    <div v-if="description" class="description" v-html="description" />

    <div v-if="ctas && Array.isArray(ctas)" class="button-row">
      <Button v-for="(cta, index) in ctas" :key="index" :button="cta" />
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'
import Box from '@/components/icons/Box'
import Social from '@/components/icons/Social'
import Phonebook from '@/components/icons/Phonebook'
import IconPixelTwitter from '@/components/icons/PixelTwitter'

// ====================================================================== Export
export default {
  name: 'TextBlock',

  components: {
    Button,
    Box,
    Social,
    Phonebook,
    IconPixelTwitter
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
    theme () {
      // 'purple-green', 'green-purple', 'red-purple', 'red-green'
      return this.block.theme || 'purple-green'
    },
    buttonTheme () {
      return this.block.button_theme
    },
    label () {
      const label = this.block.label
      if (typeof label === 'object') {
        label.theme = this.buttonTheme
      }
      return label
    },
    date () {
      if (this.block.date) {
        const date = this.$moment.utc(new Date(this.block.date))
        return `${date.format('MMMM D YYYY')}`
      }
      return false
    },
    tags () {
      return Array.isArray(this.block.tags) ? this.block.tags : []
    },
    heading () {
      return this.block.heading
    },
    headingLevel () {
      const format = this.format
      let size
      switch (format) {
        case 'header':
          size = 'h1'
          break // 50pt
        case 'medium':
          size = 'h2'
          break // 40pt
        case 'small':
          size = 'h3'
          break // 35pt
        case 'tiny':
          size = 'h4'
          break // 24pt
        default:
          size = 'h2'
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
      if (!this.block.ctas) {
        return undefined
      }
      return this.block.ctas.map(cta => ({
        ...cta,
        theme: this.buttonTheme || cta.theme
      }))
    },
    dataIdAttribute () {
      return this.block.data_id
    },
    icon () {
      return this.block.icon
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
        -webkit-box-decoration-break: clone;
      }
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Content
.label {
  @include label_2;
  margin-bottom: 6.25rem;
  @include small {
    margin-bottom: 2.125rem;
  }
}

.heading {
  &:not(:last-child) {
    margin-bottom: 2.1875rem;
  }
}

::v-deep .description {
  @include p3;
  ul {
    padding: 0.5rem 0 2rem 2rem;
    li {
      padding: 1rem 0 0.25rem 0.5rem;
      list-style-type: square;
      &:first-child {
        padding-top: 0.25rem;
      }
      &:last-child {
        padding-bottom: 1rem;
      }
    }
  }
}

.icon {
  color: $cararra;
  width: 2.5rem;
  margin-bottom: 1.75rem;
  margin-top: 0.875rem;
}
</style>
