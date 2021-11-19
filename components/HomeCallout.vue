<template>
  <div class="get-involved-callout">

    CALLOUT

  </div>
</template>

<script>
// ===================================================================== Imports
// import TextBlock from '@/components/TextBlock'

// ====================================================================== Export
export default {
  name: 'HomeCallout',

  components: {
    // TextBlock
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
    text_1: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    },
    text_2: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
</style>
