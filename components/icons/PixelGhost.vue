<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.641 24.876">
    <path class="eye" d="M5,15.28h7.28v3.64h3.64V8H5Z" transform="translate(-0.082 -0.557)" />
    <path class="eye" d="M12,15.28h7.28v3.64h3.64V8H12Z" transform="translate(-0.198 -0.557)" />
    <path d="M24.877,13.82V6.91H22.112V4.146H19.348V0H8.292V4.146H5.528V6.91H2.764v6.91H0v5.528H2.764v5.528H8.292V22.112h2.764v2.764h5.528V22.112h2.764v2.764h5.528V19.348h2.764V13.82ZM11.056,15.2H9.674V13.82H6.91V11.056h4.146Zm9.674,0H19.348V13.82H16.584V11.056H20.73Z" />
  </svg>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'PixelGhost'
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
path {
  &:not(.eye) {
    fill: $cararra;
  }
  &.eye {
    fill: $haiti;
  }
}
</style>
