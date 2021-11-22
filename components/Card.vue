<template>
  <component
    :is="element"
    :to="element === 'nuxt-link' ? url : undefined"
    :href="element === 'a' ? url : undefined"
    :target="target"
    :class="['card', `type__${type}`, { 'with-image': img, 'is-link': element !== 'div' }]"
    :data-id="dataIdAttribute">

    <div
      v-if="divider.top"
      :class="['top-divider', `gradient_${gradient}`]">
    </div>

    <div
      :class="['background', `gradient_${gradient}`]">
    </div>

    <div :class="['content', direction]">
      <div class="panel-image">
        <div class="image-wrapper">
          <img
            v-if="img && imgType !== 'background_image' && imgType !== 'nuxt_link'"
            :src="img"
            :class="['image', `size-${imgSize}`]" />
        </div>
      </div>

      <div class="panel-text">

        <div v-if="title" class="title">
          {{ title }}
          <span v-if="additionalInfo">
            {{ additionalInfo }}
          </span>
        </div>

        <div class="info-wrapper">
          <div class="info">

            <div
              v-if="date"
              class="date"
              v-html="getDate('small')">
            </div>

            <span v-if="tags" class="bar">|</span>

            <div
              v-if="tags"
              class="tags-list">
              <div
                v-for="tag in tags"
                :key="tag"
                :class="['tag', `gradient_${gradient}`]">
                {{ tag }}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

    <div
      v-if="divider.bottom"
      :class="['bottom-divider', `gradient_${gradient}`]">
    </div>

  </component>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'Card',

  components: {
    Button
  },

  props: {
    card: {
      type: Object,
      required: true
    },
    forceImageType: {
      type: String,
      required: false,
      default: 'img'
    }
  },

  computed: {
    type () {
      return this.card.type
    },
    action () {
      return this.card.action || 'div'
    },
    element () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'div'; break
      }
      return tag
    },
    target () {
      return this.card.target
    },
    url () {
      return this.card.url
    },
    img () {
      return this.card.img
    },
    imgSize () {
      return this.card.img_size || 'full'
    },
    imgType () {
      const force = this.forceImageType
      if (force !== 'img') { return force }
      return this.card.img_type
    },
    imgBackgroundPosition () {
      return this.card.img_background_position || 'center center'
    },
    title () {
      return this.card.title
    },
    description () {
      return this.card.description
    },
    date () {
      return this.card.date
    },
    label () {
      return this.card.label
    },
    dataIdAttribute () {
      return this.card.data_id
    },
    direction () {
      return this.card.direction || 'forward'
    },
    gradient () {
      return this.card.gradient
    },
    tags () {
      return Array.isArray(this.card.tags) ? this.card.tags : false
    },
    additionalInfo () {
      return this.card.additional_info
    },
    divider () {
      return this.card.divider || {}
    }
  },

  methods: {
    getDate (format) {
      const date = this.date
      const start = Array.isArray(date) ? this.$moment.utc(new Date(date[0])) : this.$moment.utc(new Date(date))
      const end = Array.isArray(date) ? this.$moment.utc(new Date(date[1])) : false
      if (format === 'large') { // big date
        return `${start.format('MM/DD')}<br />${start.format('YYYY')}`
      }
      let isPast = this.$moment.utc(new Date()).isAfter(start, 'day')
      let pastTag = isPast ? '(Past) ' : ''
      if (end) { // range, two dates
        isPast = this.$moment.utc(new Date()).isAfter(end, 'day')
        pastTag = isPast ? '(Past) ' : ''
        if (start.year() === end.year()) { // same year
          return `${pastTag}${start.format('MMM D')} - ${end.format('MMM D YYYY')}`
        } else { // different years
          return `${pastTag}${start.format('MMM D YYYY')} - ${end.format('MMM D YYYY')}`
        }
      } else {
        return `${start.format('MMMM D YYYY')}`
      }
    },
    shortenString (string, n) {
      const chars = string.split('')
      if (chars.length > n) {
        const shortened = chars.slice(0, n)
        return `${shortened.join('')}...`
      }
      return chars.join('')
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// Content
.card {
  position: relative;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &.reverse {
    flex-direction: row-reverse;
  }
}

.image {
  // margin-bottom: 0.5rem;
  &.size-full {
    width: 100%;
  }
  &.size-regular {
    width: 2.5rem;
  }
  &.size-mini {
    width: 1.375rem;
  }
  &.background-image {
    background-size: cover;
    background-repeat: no-repeat;
  }
}

// //////////////////////////////////////////////////////////////////// Dividers
.top-divider {
  top: 0;
}

.bottom-divider {
  bottom: 0;
}

.top-divider,
.background,
.bottom-divider {
  &.gradient_red-purple,
  &.gradient_purple-green,
  &.gradient_red-green {
    position: absolute;
    width: calc(100% + 20rem);
    height: 4px;
    left: -9.75rem;
    z-index: 1;
    &:before,
    &:after {
      content: '';
      position: absolute;
      width: inherit;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 0;
    }
    &:before {
      transform: translateX(-100%);
    }
    &:after {
      transform: translateX(calc(100% - 20.25rem));
    }
  }

  &.gradient_red-purple {
    background: $gradient_RedPurple;
    &:before {
      background-color: $coralRed;
    }
    &:after {
      background-color: $perfume;
    }
  }

  &.gradient_purple-green {
    background: $gradient_PurpleGreen;
    &:before {
      background-color: $perfume;
    }
    &:after {
      background-color: $greenYellow;
    }
  }

  &.gradient_red-green {
    background: $gradient_RedGreen;
    &:before {
      background-color: $coralRed;
    }
    &:after {
      background-color: $greenYellow;
    }
  }
}

.background {
  transition: 350ms ease;
  opacity: 0;
  z-index: -1 !important;
}

// ////////////////////////////////////////////////////////////////// Variations
// -------------------------------------------------------------------- [Type] A

.card.type__B {
  color: white;
  transition: 350ms ease;
  .title {
    @include h3;
    margin-bottom: 1rem;
    @include small {
      @include fontSize_Medium;
    }
  }
  .panel-image {
    padding: 3.375rem 0;
    width: 33%;
  }
  .image-wrapper {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-right: auto;
    width: 12.5rem;
    height: 12.5rem;
    overflow: hidden;
  }
  .reverse {
    .image-wrapper {
      margin-right: 0;
      margin-left: auto;
    }
  }
  .image {
    position: absolute;
    top: -1000px;
    bottom: -1000px;
    left: -1000px;
    right: -1000px;
    margin: auto;
  }
  .panel-text {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 66%;
    @include small {
      width: 50%;
    }
  }
  .info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    &:after {
      content: '';
      height: 0;
      width: 100%;
      display: block;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='560.5' height='25' viewBox='0 0 560.5 25'%3e%3cg id='Group_1573' data-name='Group 1573' transform='translate(-217.5 -1079.359)'%3e%3cline id='Line_17' data-name='Line 17' x2='556' transform='translate(217.5 1091.859)' fill='none' stroke='%23070517' stroke-width='5'/%3e%3crect id='Rectangle_1279' data-name='Rectangle 1279' width='5' height='5' transform='translate(758 1079.359)' fill='%23090015'/%3e%3crect id='Rectangle_1280' data-name='Rectangle 1280' width='5' height='5' transform='translate(763 1084.359)' fill='%23090015'/%3e%3crect id='Rectangle_1281' data-name='Rectangle 1281' width='5' height='5' transform='translate(763 1094.359)' fill='%23090015'/%3e%3crect id='Rectangle_1282' data-name='Rectangle 1282' width='5' height='5' transform='translate(768 1092.359)' fill='%23090015'/%3e%3crect id='Rectangle_1283' data-name='Rectangle 1283' width='5' height='5' transform='translate(773 1089.359)' fill='%23090015'/%3e%3crect id='Rectangle_1284' data-name='Rectangle 1284' width='5' height='5' transform='translate(768 1087.359)' fill='%23090015'/%3e%3crect id='Rectangle_1285' data-name='Rectangle 1285' width='5' height='5' transform='translate(758 1099.359)' fill='%23090015'/%3e%3c/g%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-size: auto;
      position: relative;
      transition: 350ms ease;
    }
  }
  .info {
    display: flex;
    flex-direction: row;
  }
  .info,
  .date,
  .tag {
    @include fontSize_Small;
    @include fontWeight_Semibold;
    line-height: 1.6;
    letter-spacing: $letterSpacing_Large;
  }
  .bar {
    margin: 0 0.5rem;
  }
  .tag {
    display: inline;
    background-size: 200%;
    background-position: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    transition: 350ms ease;
    &.gradient_purple-green {
      background-image: linear-gradient(90deg, $coralRed 0%, #7d7df0 50%, $greenYellow 100%);
    }
    &.gradient_red-purple {
      background-image: linear-gradient(90deg, $greenYellow 0%, $coralRed 50%, $perfume 100%);
    }
    &.gradient_red-green {
      background-image: linear-gradient(90deg, $perfume 0%, $coralRed 50%, $greenYellow 100%);
    }
  }
  &:hover {
    color: $haiti;
    cursor: pointer;
    .background {
      height: 100%;
      opacity: 1;
    }
    .info-wrapper {
      &:after {
        height: 25px;
      }
    }
    .tag {
      background-position: 0%;
    }
  }
}

</style>
