<template>
  <div v-if="!hidden" class="breadcrumbs">

    <template v-for="(link, index) in links">

      <Button
        v-if="link.url"
        :key="`link-${index}`"
        :button="link"
        class="breadcrumb link" />

      <div
        v-else
        :key="`text-${index}`"
        class="breadcrumb text">
        {{ link.text }}
      </div>

      <div
        :key="`divider-${index}`"
        class="divider">
        >
      </div>

    </template>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'Breadcrumbs',

  components: {
    Button
  },

  data () {
    return {
      hidden: false,
      links: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      page404: 'global/page404'
    }),
    breadcrumbsMapping () {
      return this.siteContent.general.breadcrumbs_mapping
    }
  },

  watch: {
    page404 () {
      this.setBreadcrumbLinks()
    }
  },

  mounted () {
    this.setBreadcrumbLinks()
  },

  methods: {
    setBreadcrumbLinks () {
      const labels = this.breadcrumbsMapping
      const route = this.$route
      const routeName = route.name
      const text = labels[routeName]
      const links = [{ // contains index route by default
        type: 'X',
        action: 'nuxt-link',
        url: '/',
        text: labels.index
      }]
      if (!this.page404) {
        if (routeName === 'index') { // hide from home page
          this.hidden = true
        } else if (routeName === 'id') { // only blog singular pages are nested right now
          const blogRoute = this.$router.options.routes.find(obj => obj.name === 'blog')
          links.push(
            {
              type: 'X',
              action: 'nuxt-link',
              url: blogRoute.path,
              text: labels.blog
            },
            {
              text: 'Blog Singular' // TODO: this should pull the blog page name?
            }
          )
        } else { // all other regular non-nested pages
          links.push({ text })
        }
      } else {
        links.push({ text: labels.error })
      }
      this.links = links
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.breadcrumbs {
  @include label_3;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
}

.breadcrumb {
  &.link {
    @include fontWeight_Semibold;
    &:hover {
      text-decoration: underline;
    }
  }
  &.text {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    + .divider {
      display: none;
    }
  }
}

.divider {
  @include fontWeight_Regular;
  margin: 0 0.25rem;
}
</style>
