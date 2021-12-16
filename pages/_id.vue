<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="{ disable: true, nav_theme: 'light' }" />

    <BlockBuilder :sections="postHeading" />

    <div class="grid-noGutter">
      <div class="col">
        <div class="socials-wrapper">
          <div class="prompt">
            Share
          </div>
          <SocialBar
            :hide-social-icons="false"
            :show-button-icons="false"
            :show-labels="false" />
        </div>
      </div>
    </div>

    <section id="post-body" class="content-section">
      <div class="grid">

        <div class="col-10_sm-12" data-push-left="off-1_sm-0">
          <nuxt-content :document="postBody" class="basic-template-block-format" />
        </div>

      </div>
    </section>

    <div class="grid-noGutter">
      <div class="col-10_sm-12" data-push-left="off-1_sm-0">
        <div class="bottom-links">
          <div class="socials-wrapper">
            <div class="prompt">
              Share
            </div>
            <SocialBar
              :hide-social-icons="false"
              :show-button-icons="false"
              :show-labels="false" />
          </div>
          <div class="tag-flex">
            <div
              v-for="item in tags"
              :key="item"
              class="tag">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <section v-if="recommendedPosts" id="featured-post-list">
      <BlockBuilder :sections="latestNews" />
      <CardListBlock :block="{ cards: recommendedPosts }" />
      <Button :button="viewAllButton" />
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import SocialBar from '@/components/SocialBar'
import CardListBlock from '@/components/CardListBlock'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'PageBlog',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    SocialBar,
    CardListBlock,
    Button
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
      return {
        post_heading: {
          col_1: {
            type: 'text_block',
            layout: 'large',
            cols: {
              num: 'col-7_sm-10'
            },
            date: this.markdown.date || this.markdown.createdAt,
            tags: this.markdown.tags,
            heading: this.markdown.title
          },
          col_2: {
            type: 'image_block',
            src: this.markdown.image,
            cols: {
              num: 'col-4_sm-8',
              push_left: 'off-1_sm-0'
            }
          }
        }
      }
    },
    latestNews () {
      return {
        latest_news: {
          col_1: {
            type: 'text_block',
            cols: {
              num: 'col-9_sm-12'
            },
            label: 'Latest News From FFDW',
            heading: 'Updates from our organization and across the Web3 universe.'
          }
        }
      }
    },
    postBody () {
      return this.markdown
    },
    allPosts () {
      return this.markdown.allPosts
    },
    tags () {
      return Array.isArray(this.markdown.tags) ? this.markdown.tags : []
    },
    // morePosts () {
    //   const sections = CloneDeep(this.siteContent.blog.page_content)
    //   delete sections.intro
    //   sections.recommended_posts = {
    //     col_1: {
    //       type: 'card_list_block',
    //       cols: {
    //         num: 'col-12'
    //       },
    //       cards: this.recommendations
    //     }
    //   }
    //   return sections
    // },
    recommendedPosts () {
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
              theme: 'red-green',
              direction: i % 2 ? 'reverse' : 'forward'
            })
          }
        }
        return recommendedPosts.length > 0 ? recommendedPosts : false
      }
      return false
    },
    viewAllButton () {
      return {
        type: 'C',
        action: 'nuxt-link',
        text: 'View All',
        url: '/blog'
      }
    }
  },

  mounted () {
    const images = document.getElementsByTagName('img')
    for (let i = 0; i < images.length; i++) {
      const string = images[i].alt
      if (string.includes('video')) {
        images[i].parentNode.parentNode.classList.add('video-overlay')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #post_heading {
  padding-top: 2rem;
  padding-bottom: 2rem;
  .date {
    display: flex;
    flex-direction: row;
  }
  .image {
    position: relative;
    margin-top: 2rem;
  }
  .image-block {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 100%;
      width: 2.3125rem;
      height: 2.3125rem;
      transform: translateY(-100%);
      background-color: $greenYellow;
    }
  }
  .text-block {
    .tags {
      &:before {
        content: '|';
        margin: 0 0.75rem;
      }
    }
    .heading {
      margin-top: 2.5rem;
      @include small {
        @include fontSize_Medium;
        @include leading_Medium;
      }
    }
    @include mini {
      @include fontSize_Tiny;
    }
  }
}

.socials-wrapper {
  display: flex;
  flex-direction: row;
  height: 1.5rem;
  margin-bottom: 5rem;
  .prompt {
    @include fontSize_Small;
    @include fontWeight_Semibold;
    margin-left: 0.5rem;
    margin-right: 2rem;
    line-height: 1.5rem;
  }
}

::v-deep .social-bar {
  a {
    margin-right: 1.5rem !important;
  }
  a,
  svg {
    height: 100%
  }
  svg,
  path {
    stroke: $greenYellow;
    fill: $greenYellow;
  }
}

#post-body {
  padding: 5rem 0;
  @include small {
    padding: 3rem 0;
  }
}

.bottom-links,
.tag-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .socials-wrapper {
    margin: 0;
  }
}

.bottom-links {
  @include mini {
    flex-direction: column;
  }
  .socials-wrapper {
    margin-bottom: 1rem;
    .prompt {
      @include mini {
        margin-left: 0;
      }
    }
  }
}

.tag {
  position: relative;
  @include fontSize_Small;
  @include fontWeight_Semibold;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    border: solid 1px white;
  }
}

::v-deep #featured-post-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  .card-list-block {
    width: 100%;
  }
  .button {
    margin-top: 3rem;
  }
}
</style>
