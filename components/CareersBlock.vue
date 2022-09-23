<template>
  <div id="career-block" :class="[`block careers-block theme__${theme}`]">

    <div class="grid">
      <div class="col">
        <TextBlock :block="textBlock" />
      </div>
    </div>

    <section class="section-bottom">
      <div class="grid">

        <div class="col-6_mi-12">
          <div class="panel-left">
            <img :src="featuredImage" class="image" />
          </div>
        </div>

        <div class="col-5_sm-8_mi-12" data-push-left="off-1_sm-0">
          <div class="panel-right">
            <CardListBlock
              :block="{ cards: cards }" />
            <!--
              Below CTA button is hidden per stakeholder request. Leaving for now in
              case they want to re-enable it in the future.
            -->
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
    },
    forceHeading: {
      type: [String, Boolean],
      required: false,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      postings: 'global/jobPostings'
    }),
    content () {
      const content = CloneDeep(this.siteContent.careers_data)
      const jobs = this.postings
      const cardCustomizations = content.card_customizations
      content.cards = []
      const cards = content.cards
      const cardsLength = jobs.length > cardCustomizations.number_job_postings ? cardCustomizations.number_job_postings : jobs.length
      for (let i = 0; i < cardsLength; i++) {
        const cardObj = {
          type: cardCustomizations.type,
          title: jobs[i].text,
          description: (jobs[i].description.split('Job Description</span></div>', 2))[1],
          link_label: cardCustomizations.link_label,
          url: jobs[i].hostedUrl
        }
        cards.push(cardObj)
      }
      return content
    },
    label () {
      return this.content.label
    },
    heading () {
      return this.forceHeading || this.content.heading
    },
    primaryCta () {
      const themes = {
        purple: 'red-purple',
        green: 'red-green'
      }
      return Object.assign(this.content.primary_cta, {
        theme: themes[this.theme]
      })
    },
    textBlock () {
      return {
        label: this.label,
        heading: this.heading,
        format: 'header',
        ctas: [this.primaryCta]
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
          theme: this.theme,
          action: 'a',
          target: '_blank',
          text: card.link_label,
          url: card.url,
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
      .icon-after.arrow-down {
        svg {
          rect {
            fill: $perfume;
          }
        }
      }
    }
  }
  &.theme__green {
    ::v-deep .card {
      .icon-after.arrow-down {
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
  display: none;
  padding: 5rem 0 10rem;
  @include small {
    padding: 3rem 0 6rem;
  }
  @include mini {
    padding-bottom: 0;
  }
}

// ///////////////////////////////////////////////////////////////////// Content
::v-deep .text-block {
  .button-row {
    margin-top: 4rem;
  }
}

.image {
  width: 100%;
  padding-left: 2rem;
  @include small {
    padding-left: 0;
    margin-bottom: 2rem;
  }
}

::v-deep .card {
  .description {
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @supports (-webkit-line-clamp: 2) {
    .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: auto;
      position: relative;
    }
  }
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
