<template>
  <div class="social-bar">

    <Button
      v-for="(icon, index) in icons"
      :key="index"
      :button="icon"
      :class="['social-icon', { 'show-button-icons': showButtonIcons }]">

      <component
        :is="icon.component"
        v-if="!hideSocialIcons" />

      <div
        v-if="icon.label && showLabels"
        class="label">
        {{ icon.label }}
      </div>

    </Button>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import Button from '@/components/Button'

import TwitterIcon from '@/components/icons/Twitter'
import YoutubeIcon from '@/components/icons/Youtube'
import LinkedInIcon from '@/components/icons/LinkedIn'

// ====================================================================== Export
export default {
  name: 'SocialBar',

  components: {
    TwitterIcon,
    YoutubeIcon,
    LinkedInIcon,
    Button
  },

  props: {
    forceList: {
      type: Array,
      required: false,
      default: () => []
    },
    hideSocialIcons: {
      type: Boolean,
      required: false,
      default: false
    },
    showButtonIcons: {
      type: Boolean,
      required: false,
      default: false
    },
    showLabels: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    icons () {
      return this.forceList.length > 0 ? this.forceList : this.siteContent.general.social
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.social-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

::v-deep .social-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  &:not(:last-child) {
    margin-right: 2.5rem;
  }
  &:not(.show-button-icons) {
    .icon-after {
      display: none;
    }
  }
  .icon-after.arrow-down {
    margin-left: 0.5rem;
    svg {
      width: 0.5rem;
      transform: rotate(-90deg);
      rect {
        fill: $haiti;
      }
    }
  }
}

.svg-twitter {
  width: 2.9375rem;
}

.svg-youtube {
  width: 3rem;
}

.svg-linkedin {
  width: 2.5625rem;
}
</style>
