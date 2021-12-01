<template>
  <div class="social-icons">

    <Button
      v-for="(icon, index) in icons"
      :key="index"
      :button="icon"
      class="social-icon">

      <component :is="icon.component" />

      <div class="label">
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
  name: 'SocialIcons',

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
.social-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.social-icon {
  &:not(:last-child) {
    margin-right: 2.5rem;
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

.label {
  display: none;
}
</style>
