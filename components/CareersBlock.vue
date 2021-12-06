<template>
  <div :class="[`block careers-block theme__${theme}`]">

    <div class="grid">
      <div class="col">
        <TextBlock :block="textBlock" />
      </div>
    </div>

    <section class="section-bottom">
      <div class="grid-middle">

        <div class="col-6">
          <div class="panel-left">
            <img :src="featuredImage" class="image" />
          </div>
        </div>

        <div class="col-5" data-push-left="off-1">
          <div class="panel-right">
            <CardListBlock :block="{ cards: cards }" />
            <TextBlock :block="{ ctas: secondaryCtas }" />
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import TextBlock from '@/components/TextBlock'
import CardListBlock from '@/components/CardListBlock'

// ====================================================================== Export
export default {
  name: 'CareersBlock',

  components: {
    TextBlock,
    CardListBlock
  },

  props: {
    theme: {
      type: String,
      required: false,
      default: 'purple'
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    content () {
      return this.siteContent.careers_data
    },
    label () {
      return this.content.label
    },
    heading () {
      return this.content.heading
    },
    primaryCtas () {
      return this.content.primary_ctas
    },
    textBlock () {
      return {
        label: this.label,
        heading: this.heading,
        ctas: this.primaryCtas
      }
    },
    featuredImage () {
      return this.content.featured_image
    },
    cards () {
      const cards = CloneDeep(this.content.cards)
      cards.forEach((card) => {
        card.ctas = [{
          type: 'D',
          theme: card.theme,
          action: 'nuxt-link',
          text: 'Apply Now',
          url: '/',
          icon_after: 'arrow-down'
        }]
      })
      return cards
    },
    secondaryCtas () {
      return this.content.secondary_ctas
    }
  }
}
</script>

<style lang="scss" scoped>
// //////////////////////////////////////////////////////////// General & Themes
.careers-block {
  position: relative;
  &.theme__purple {
    ::v-deep .card {
      .icon.arrow-down {
        svg {
          rect {
            fill: $perfume;
          }
        }
      }
    }
  }
  &.theme__red-green {
    ::v-deep .card {
      .icon.arrow-down {
        svg {
          rect {
            fill: $greenYellow;
          }
        }
      }
    }
  }
}

.panel-right {
  ::v-deep .text-block {
    .button-row {
      margin-top: 3rem;
    }
  }
}

.section-bottom {
  padding: 5rem 0;
}

// ///////////////////////////////////////////////////////////////////// Content
.image {
  width: 100%;
  padding-left: 2rem;
}

::v-deep .card {
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  .icon-after.arrow-down {
    svg {
      width: 0.75rem;
      transform: rotate(-90deg);
    }
  }
}
</style>
