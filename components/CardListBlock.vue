<template>
  <div class="block card-list-block">

    <Card
      v-for="(card, index) in cards"
      :key="index"
      :card="card"
      :style="{ zIndex: totalNumCards - index }" />

  </div>
</template>

<script>
// ====================================================================== Import
import Card from '@/components/Card'

// ====================================================================== Export
export default {
  name: 'CardListBlock',

  components: {
    Card
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
