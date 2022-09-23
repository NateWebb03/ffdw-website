<template>
  <svg width="565" height="373" viewBox="0 0 565 373" fill="none" xmlns="http://www.w3.org/2000/svg">
    <template v-if="variant === 'A'">
      <rect width="565" height="373" fill="url(#paint0_linear_421_3533)"/>
      <rect x="16" y="19" width="532" height="334" fill="black"/>
      <defs>
        <linearGradient id="paint0_linear_421_3533" x1="0" y1="373" x2="565" y2="373" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B5B5FA"/>
          <stop offset="1" stop-color="#BAFE36"/>
        </linearGradient>
      </defs>
    </template>

    <template v-if="variant === 'B'">
      <rect width="565" height="373" fill="url(#paint0_linear_421_3589)"/>
      <rect x="528" y="157" width="37" height="37" fill="#070517"/>
      <rect x="507" y="259" width="29" height="28" fill="#070517"/>
      <rect x="536" y="259" width="29" height="28" fill="#070517"/>
      <rect x="536" y="230" width="15" height="14" fill="#070517"/>
      <rect x="507" y="316" width="15" height="14" fill="#070517"/>
      <rect x="449" y="216" width="15" height="14" fill="#070517"/>
      <rect x="449" y="360" width="15" height="14" fill="#070517"/>
      <rect x="478" y="287" width="29" height="29" fill="#070517"/>
      <rect x="536" y="345" width="29" height="28" fill="#070517"/>
      <rect x="478" y="230" width="29" height="29" fill="#070517"/>
      <rect x="536" y="287" width="29" height="29" fill="#070517"/>
      <defs>
        <linearGradient id="paint0_linear_421_3589" x1="0" y1="373" x2="565" y2="373" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B5B5FA"/>
          <stop offset="1" stop-color="#BAFE36"/>
        </linearGradient>
      </defs>
    </template>

    <template v-if="variant === 'C'">
      <rect width="565" height="373" fill="url(#paint0_linear_421_3567)"/>
      <rect x="448" width="117" height="117" fill="#070517"/>
      <rect y="305" width="68" height="68" fill="#070517"/>
      <rect x="410" y="118" width="37" height="37" fill="#070517"/>
      <rect x="68" y="268" width="37" height="37" fill="#070517"/>
      <rect x="31" y="231" width="37" height="37" fill="#070517"/>
      <rect x="79" y="217" width="15" height="14" fill="#070517"/>
      <defs>
        <linearGradient id="paint0_linear_421_3567" x1="0" y1="373" x2="565" y2="373" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B5B5FA"/>
          <stop offset="1" stop-color="#BAFE36"/>
        </linearGradient>
      </defs>
    </template>
  </svg>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'VideoPreviewImage1',

  props: {
    variant: {
      type: String,
      required: false,
      default: 'A'
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
</style>
