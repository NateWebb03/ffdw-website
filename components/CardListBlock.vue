<template>
  <div class="block card-list-block">

    <template v-for="(card, index) in cards">

      <VideoBlock
        v-if="card.type === 'video'"
        :key="index"
        :block="card" />

      <Card
        v-else
        :key="index"
        :card="card"
        :style="{ zIndex: totalNumCards - index }" />

    </template>

  </div>
</template>

<script>
// ====================================================================== Import
import Card from '@/components/Card'
import VideoBlock from '@/components/VideoBlock'

// ====================================================================== Export
export default {
  name: 'CardListBlock',

  components: {
    Card,
    VideoBlock
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    cards () {
      return this.block.cards
    },
    totalNumCards () {
      return this.cards.length
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card {
  width: 100%;
}
</style>
