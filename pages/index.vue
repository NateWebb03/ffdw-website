<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

    <section id="featured-post-list">
      <div class="grid">
        <div class="col">
          <CardListBlock :block="{ cards: featuredPosts }" />
          <Button :button="viewAllButton" />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import SettingsData from '@/content/data/settings.json'
import IndexPageData from '@/content/pages/index.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CardListBlock from '@/components/CardListBlock'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    CardListBlock,
    Button
  },

  async asyncData ({ $content }) {
    const blogPosts = await $content('blog')
      .without(['body'])
      .sortBy('updatedAt', 'desc')
      .limit(3)
      .fetch()
    return { blogPosts }
  },

  data () {
    return {
      tag: 'index',
      blogPosts: []
    }
  },

  async fetch ({ store, $content }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'settings', data: SettingsData })
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    sections () {
      return this.pageData.page_content
    },
    header () {
      return this.pageData.header
    },
    featuredPosts () {
      const arr = []
      const len = this.blogPosts.length
      for (let i = 0; i < len; i++) {
        const post = this.blogPosts[i]
        const card = {
          type: 'B',
          action: 'nuxt-link',
          url: `/${post.slug}`,
          img: post.image,
          title: post.title,
          date: post.date || post.updatedAt,
          tags: post.tags,
          divider: {
            top: true,
            bottom: (i === len - 1)
          },
          gradient: 'purple-green',
          direction: i % 2 ? 'reverse' : 'forward'
        }
        arr.push(card)
      }
      return arr
    },
    viewAllButton () {
      return {
        type: 'B',
        action: 'nuxt-link',
        text: 'View All',
        url: '/blog'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #about_1 {
  padding-top: 8rem;
  .text-block {
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2.5rem;
    }
    &:before {
      width: 2.5rem;
      top: 1rem;
      left: 100%;
      background-color: $perfume;
    }
    &:after {
      width: 20rem;
      top: 3.5rem;
      left: calc(100% + 2.5rem);
      background-color: $greenYellow;
    }
  }
}

::v-deep #intro_1 {
  padding: 0;
  .image-block {
    padding: 0 3rem;
  }
}

::v-deep #intro_2 {
  padding-top: 2rem;
}

::v-deep #accordion_1 {
  padding: 0;
  .accordion-block {
    &:before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 7rem;
      top: 20%;
      right: calc(100% + #{math.div($containerWidth, 12) * 3} - 2rem);
      background-color: $perfume;
    }
  }
  .text-block {
    .button-row {
      justify-content: flex-end;
    }
  }
}

::v-deep #grants {
  [data-block-id="image_left"] {
    .image-block {
      background: teal;
      &:before {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: calc(50% + 3rem);
        top: -3rem;
        right: 100%;
        background-color: $greenYellow;
      }
    }
  }
  .text-block {
    padding: 0 2.25rem;
  }
  [data-block-id="image_right"] {
    .image-block {
      &:before {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: calc(20% + 4rem);
        bottom: -4rem;
        left: 100%;
        background-color: $perfume;
      }
    }
  }
}

::v-deep #callout {
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    padding: 0;
  }
}

::v-deep #featured-post-list {
  .button {
    margin: 5rem 0;
  }
}
</style>
