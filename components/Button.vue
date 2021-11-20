<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :target="target"
    :class="['button', `type__${type}`, `action__${action}`, `theme__${theme}`, { selected }]"
    @click="openModal">

    <!-- <div
      v-if="type !== 'X' && icon"
      :class="['icon', icon]">
      <IconPlay v-if="icon === 'play'" />
      <IconInfo v-if="icon === 'info'" />
      <IconPlus v-if="icon === 'plus'" />
      <IconCode v-if="icon === 'code'" />
      <IconTicket v-if="icon === 'ticket'" />
    </div> -->

    <template v-if="type === 'A'">
      <div class="artifact artifact-1"></div>
      <div class="artifact artifact-2"></div>
      <div class="artifact artifact-3"></div>
    </template>

    <span class="text">
      {{ text }}
    </span>

    <!-- <slot v-if="type === 'X'" /> -->

  </component>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

// import IconPlay from '@/components/icons/Play'
// import IconInfo from '@/components/icons/Info'
// import IconPlus from '@/components/icons/Plus'
// import IconCode from '@/components/icons/Code'
// import IconTicket from '@/components/icons/Ticket'

// ====================================================================== Export
export default {
  name: 'Button',

  // components: {
  //   IconPlay,
  //   IconInfo,
  //   IconPlus,
  //   IconCode,
  //   IconTicket
  // },

  props: {
    /*
      (A) → Primary CTA, usually with gradients (ex: Accordion on Home page)
      (B) → Same as the Primary CTA except black artifacts (ex: CTA in Header of Home page)
      (B) → Secondary CTA, usually clear with a white border (ex: just above Footer on Home page)
    */
    button: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    type () {
      return this.button.type
    },
    action () {
      return this.button.action || 'button'
    },
    tag () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'button'; break
      }
      return tag
    },
    target () {
      return this.button.target
    },
    icon () {
      return this.button.icon
    },
    text () {
      return this.button.text
    },
    url () {
      return this.button.url
    },
    theme () { // 'purple-green', 'red-purple', 'red-green', 'black'
      return this.button.theme || 'purple-green'
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal () {
      this.$emit('buttonClicked', this.button)
      if (this.action === 'video') {
        this.setModal({
          action: 'video',
          url: this.url
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.button {
  @include leading_Small;
  display: inline-flex;
  flex-direction: row;
  position: relative;
}

.icon {
  svg {
    display: block;
  }
}

.text {
  display: block;
  position: relative;
  z-index: 15;
}

// ////////////////////////////////////////////////////////////////// Variations
// -------------------------------------------------------------------- [Type] A
.type__A {
  @include fontSize_Tiny;
  @include fontWeight_Bold;
  line-height: 1rem;
  text-transform: uppercase;
  color: $haiti;
  padding: 1rem 2.5rem 2.5rem 2.5rem;
  &.theme__purple-green {
    @include gradient_Background_PurpleGreen;
  }
  &.theme__red-purple {
    @include gradient_Background_RedPurple;
  }
  &.theme__red-green {
    @include gradient_Background_RedGreen;
  }
  .artifact {
    position: absolute;
    background-color: $haiti;
  }
  .artifact-1 {
    bottom: 0;
    left: 0;
    width: 1.5rem;
    height: 3rem;
  }
  .artifact-2 {
    bottom: 0;
    left: 0;
    width: calc(100% - 1.5rem);
    height: 1.5rem;
  }
  .artifact-3 {
    top: 0;
    right: 0;
    width: 1.5rem;
    height: 3rem;
  }
}

// -------------------------------------------------------------------- [Type] B
.type__B {

}
</style>
