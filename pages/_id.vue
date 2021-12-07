<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <BlockBuilder :sections="postHeading" />

    <section id="post-body" class="content-section">
      <div class="grid">

        <div class="col-10" data-push-left="off-1">
          <nuxt-content :document="postBody" class="basic-template-block-format" />
        </div>

      </div>
    </section>

    <BlockBuilder :sections="morePosts" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

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

  async asyncData ({ $content, app, store, route, error }) {
    try {
      const markdown = await $content(`blog/${route.params.id}`).fetch()
      const posts = await $content('blog').without(['body']).fetch()
      markdown.allPosts = posts.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))
      return { markdown }
    } catch (e) {
      return error('This project does not exist')
    }
  },

  data () {
    return {
      tag: 'singular'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', 'settings')
    await store.dispatch('global/getBaseData', { key: 'blog', data: BlogPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    postHeading () {
      const section = {
        post_heading: {
          col_1: {
            type: 'text_block',
            layout: 'large',
            cols: {
              num: 'col-7',
              push_left: 'off-0'
            },
            date: this.markdown.date || this.markdown.createdAt,
            tags: this.markdown.tags,
            heading: this.markdown.title
          },
          col_2: {
            type: 'image_block',
            src: this.markdown.image,
            cols: {
              num: 'col-4',
              push_left: 'off-1'
            }
          }
        }
      }
      return section
    },
    postBody () {
      return this.markdown
    },
    allPosts () {
      return this.markdown.allPosts
    },
    morePosts () {
      const sections = CloneDeep(this.siteContent.blog.page_content)
      delete sections.intro
      sections.recommended_posts = {
        col_1: {
          type: 'card_list_block',
          cols: {
            num: 'col-12'
          },
          cards: this.recommendations
        }
      }
      return sections
    },
    recommendations () {
      const recommendedPosts = []
      if (Array.isArray(this.markdown.recommendedPosts)) {
        const len = this.allPosts.length
        for (let i = 0; i < len; i++) {
          const post = this.allPosts[i]
          if (this.markdown.recommendedPosts.includes(post.slug)) {
            recommendedPosts.push({
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
              gradient: 'red-green',
              direction: i % 2 ? 'reverse' : 'forward'
            })
          }
        }
      }
      return recommendedPosts
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #post_heading {
  .date {
    display: flex;
    flex-direction: row;
  }
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

::v-deep .basic-template-block-format {
  h1 {
    @include fontSize_Large;
    @include fontWeight_Semibold;
    line-height: 1.4;
    margin-bottom: 6.25rem;
  }
  h2 {
    @include fontSize_Medium;
    @include fontWeight_Semibold;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }
  p {
    @include fontSize_Regular;
    @include fontWeight_Regular;
    line-height: 1.8;
    letter-spacing: $letterSpacing_Large;
    margin-bottom: 2.5rem;
  }
  img[alt$="left"] {
    float: left;
    width: 27%;
    margin: 0 9% 1.5rem 0;
  }
  img[alt$="right"] {
    float: right;
    width: 45%;
    margin: 0 0 1.5rem 9%;
  }
  img,
  img[alt$="center"] {
    width: 100%;
    margin: 4.75rem 0;
  }
  hr {
    border: 10px solid;
    border-image-slice: 1;
    border-width: 4px;
    border-image-source: $gradient_RedGreen;
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin: 3.5rem 0;
  }
  blockquote {
    margin: 7.25rem 0;
    p {
      border: 10px solid;
      border-image-slice: 1;
      border-width: 4px;
      border-image-source: linear-gradient(180deg, $coralRed, $greenYellow);
      border-top: none;
      border-right: none;
      border-bottom: none;
      padding-left: 5.25rem;
      @include fontSize_Large;
      @include fontWeight_Semibold;
      line-height: 1.4;
    }
  }
  li {
    margin-bottom: 1.5rem;
    padding-left: 2.875rem;
    list-style-type: none;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0rem;
      top: 0.625rem;
      width: 0.625rem;
      height: 0.625rem;
      @include gradient_Background_RedGreen;
    }
  }
}

</style>
