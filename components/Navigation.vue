<template>
  <nav :class="`navigation theme__${theme}`">

    <button class="mobile-nav-toggle-button">
      <div class="line" />
      <div class="line" />
    </button>

    <div class="navigation-content">
      <div
        v-for="(section, sectionIndex) in navigation"
        :key="`section-${sectionIndex}`"
        class="nav-link-wrapper">

        <Button
          :button="section.link"
          :class="['nav-link', { 'has-subnav': section.links }]" />

        <div
          v-if="section.links"
          class="subnav">
          <Button
            :button="{ type: 'X', action: 'nuxt-link', url: section.link.url, text: section.heading }"
            class="heading" />
          <div class="sublinks">
            <Button
              v-for="(link, linkIndex) in section.links"
              :key="`link-${linkIndex}`"
              :button="link"
              class="subnav-link" />
          </div>
          <div class="subnav-artifacts" />
        </div>

      </div>
    </div>

  </nav>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'NavBlock',

  components: {
    Button
  },

  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    content () {
      return this.siteContent.general
    },
    navigation () {
      return this.content.navigation
    }
  }
}
</script>

<style lang="scss" scoped>
$iconDimension: 1.5rem;
$squareArtifactDimension: 2.5rem;

@mixin squareArtifact {
  content: '';
  position: absolute;
  width: $squareArtifactDimension;
  height: $squareArtifactDimension;
  background-color: $cararra;
}

// ///////////////////////////////////////////////////////////////////// General
.navigation {
  z-index: 1000;
  &.theme__light {
    ::v-deep .nav-link {
      .icon-before.star,
      .icon-after.finger-up {
        path {
          fill: $cararra;
        }
      }
    }
  }
}

.mobile-nav-toggle-button {
  display: none;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
  margin-right: -1rem;
  @include small {
    display: flex;
  }
  .line {
    height: 2px;
    background-color: $haiti;
    &:first-child {
      position: relative;
      width: 13px;
      margin-bottom: 4px;
      &:before {
        content: '';
        position: absolute;
        bottom: 100%;
        right: 100%;
        width: 2px;
        height: 2px;
        background-color: inherit;
      }
    }
    &:last-child {
      width: 20px;
    }
  }
}

.navigation-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  @include small {
    // flex-direction: column;
    flex-wrap: wrap;
    position: fixed;
    top: $navigationHeight_Mobile;
    left: $gutterMobile;
    width: calc(100vw - #{$gutterMobile * 2});
    padding: 0 2rem;
    background-color: $cararra;
    z-index: 1000;
  }
}

.nav-link-wrapper {
  position: relative;
  @include small {
    width: 50%;
  }
  &:hover {
    .subnav {
      opacity: 1;
      visibility: visible;
      z-index: 100;
      transform: translate(-50%, -2rem);
      @include small {
        transform: translate(0, 0);
      }
    }
    ::v-deep .nav-link {
      &:not(.nuxt-link-active ) {
        padding-bottom: $iconDimension;
        .icon-after.finger-up {
          opacity: 1;
          transform: translateY(-$iconDimension);
        }
      }
    }
  }
  &:not(:last-child) {
    margin-right: 1.875rem;
    @include small {
      margin-right: 0;
    }
  }
}

::v-deep .nav-link {
  @include fontSize_Mini;
  @include fontWeight_Semibold;
  &:not(.has-subnav) {
    @include small {
      @include fontSize_Mini;
      @include leading_Small;
      @include fontWeight_Semibold;
      white-space: nowrap;
      color: $electricViolet;
      margin-bottom: 0.5rem;
    }
  }
  &.has-subnav {
    @include small {
      display: none;
    }
  }
  &.nuxt-link-active {
    .icon-before.star {
      opacity: 1;
    }
  }
  .icon-before.star,
  .icon-after.finger-up {
    position: absolute;
    left: calc(50% - #{math.div($iconDimension, 2)});
    width: $iconDimension;
    opacity: 0;
    path {
      fill: $haiti;
    }
  }
  .icon-before.star {
    bottom: 100%;
  }
  .icon-after.finger-up {
    top: 100%;
  }
}

.subnav {
  position: absolute;
  top: calc(100% + #{$squareArtifactDimension} + 3rem);
  left: 50%;
  padding: 2rem 2.25rem;
  padding-right: 4rem;
  background-color: $cararra;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%);
  z-index: -1;
  transition: 250ms ease-in-out;
  @include small {
    position: static;
    opacity: 1;
    background-color: transparent;
    visibility: visible;
    transform: translateX(0);
    z-index: 10;
  }
  &:before,
  &:after {
    @include squareArtifact;
    @include small {
      opacity: 0;
    }
  }
  &:before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  &:after {
    right: 100%;
    top: 0;
  }
}

.subnav-artifacts {
  position: absolute;
  top: 0;
  left: 100%;
  width: 3.5rem;
  height: 67%;
  background-color: $cararra;
  @include small {
    display: none;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $cararra;
  }
  &:before {
    top: 0;
    left: 3.5rem;
    width: 4.5rem;
    height: 4.5rem;
  }
  &:after {
    top: 100%;
    left: 100%;
    width: $squareArtifactDimension;
    height: $squareArtifactDimension;
  }
}

.sublinks {
  display: flex;
  flex-direction: column;
}

.heading {
  @include fontSize_Mini;
  @include leading_Small;
  @include fontWeight_Bold;
  white-space: nowrap;
  color: $haiti;
  margin-bottom: 0.5rem;
}

::v-deep .subnav-link {
  padding: 0.75rem 0;
  &:hover {
    .icon-before.arrow-down {
      margin-left: 0;
      opacity: 1;
    }
  }
  &:last-child {
    padding-bottom: 0;
  }
  .icon-before.arrow-down {
    margin-left: -1.25rem;
    margin-right: 0.5rem;
    opacity: 0;
    transform: rotate(-90deg);
    transition: 250ms ease-in-out;
    svg {
      width: 0.75rem;
      rect {
        fill: $haiti;
      }
    }
  }
  .text {
    color: $haiti;
  }
}
</style>
