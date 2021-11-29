<template>
  <div class="block card-list-block">

    <div class="card-column">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :card="card" />
    </div>

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
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card-column {
  display: flex;
  flex-direction: column;
}
</style>
