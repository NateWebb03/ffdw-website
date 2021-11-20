<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <BlockBuilder :sections="sections" />

    <section id="section_search">
    </section>

    <BlockBuilder :sections="blogPosts" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'PageBlog',

  components: {
    Modal,
    BlockBuilder
  },

  async asyncData ({ $content }) {
    const markdownFiles = await $content('blog').without(['body']).fetch()
    markdownFiles.sort((a, b) => { return a.updatedAt.localeCompare(b.updatedAt) })
    return { markdownFiles }
  },

  data () {
    return {
      tag: 'blog'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'blog', data: BlogPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      return this.siteContent[this.tag].page_content
    },
    posts () {
      const arr = []
      const len = this.markdownFiles.length
      for (let i = 0; i < len; i++) {
        const post = this.markdownFiles[i]
        const card = {
          type: 'B',
          img: post.image,
          title: post.title,
          date: post.date || post.updatedAt,
          tags: [
            'Tag Number One'
          ],
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
    blogPosts () {
      return {
        blog_posts: {
          col_1: {
            type: 'card_list_block',
            cols: {
              num: 'col-12'
            },
            cards: this.posts
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro {
  .image {
    position: relative;
    margin-top: 9.5rem;
  }
  .image-block {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: calc(100% - 0.5rem);
      width: 2.3125rem;
      height: 2.3125rem;
      transform: translateY(-100%);
      background-color: $greenYellow;
    }
  }
}
//
// ::v-deep #intro_2 {
//   padding-top: 2rem;
// }
//
// ::v-deep #accordion_1 {
//   padding: 0;
// }
//
// ::v-deep #grants {
//   .text-block {
//     padding: 0 2rem;
//   }
// }
</style>
