<template>
  <div class="sectionals">

    <section
      v-for="(section, sectionId) in sections"
      :id="sectionId"
      :key="sectionId"
      class="sectional">
      <div :class="['grid', getGridClasses(section.grid), section.classNames]">
        <template v-for="(block, blockId) in section">
          <div
            v-if="blockAllowed(blockId)"
            :id="`${sectionId}__${blockId}`"
            :key="blockId"
            :class="getColumnCount(block)"
            :data-push-left="getColumnPushCount(block, 'left')"
            :data-push-right="getColumnPushCount(block, 'right')">
            <div class="column-content">

              <!-- ========================================== [Block] Custom -->
              <template v-if="block.type === 'custom'">
                <component
                  :is="component.name"
                  v-for="(component, componentKey) in block.customizations"
                  :key="componentKey"
                  v-bind="component.props" />
              </template>

              <!-- ========================================= [Block] Dynamic -->
              <component
                :is="getComponentName(block)"
                v-else-if="block.type !== 'sectional'"
                v-bind="{ block }" />

              <!-- ======================= Recursive Sectional/Block imports -->
              <BlockBuilder
                v-else
                :sections="block.sections" />

            </div>
          </div>
        </template>
      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import TextBlock from '@/components/TextBlock'
import ImageBlock from '@/components/ImageBlock'
// import VideoBlock from '@/components/VideoBlock'
// import SliderBlock from '@/components/SliderBlock'
// import CardListBlock from '@/components/CardListBlock'
// import SocialIcons from '@/components/SocialIcons'
// import TabbedSlider from '@/components/TabbedSlider'
import BlockBuilder from '@/components/BlockBuilder'

// ====================================================================== Export
export default {
  name: 'BlockBuilder',

  components: {
    TextBlock,
    ImageBlock,
    // VideoBlock,
    // SliderBlock,
    // CardListBlock,
    // SocialIcons,
    // TabbedSlider,
    BlockBuilder
  },

  props: {
    sections: {
      type: Object,
      required: true
    }
  },

  methods: {
    getGridClasses (blockGrid) {
      const classList = ['grid']
      if (typeof blockGrid === 'object' && Array.isArray(blockGrid) && blockGrid.length > 0) {
        blockGrid.forEach(className => classList.push(`-${className}`))
      }
      return classList.join('')
    },
    blockAllowed (blockId) {
      return !['grid', 'classNames'].includes(blockId)
    },
    getColumnCount (block) {
      return block.cols.num
    },
    getColumnPushCount (block, direction) {
      return block.cols.hasOwnProperty(`push_${direction}`) ? block.cols[`push_${direction}`] : undefined
    },
    getComponentName (block) {
      const type = block.type
      let name = ''
      switch (type) {
        case 'text_block' : name = 'TextBlock'; break
        case 'image_block' : name = 'ImageBlock'; break
        case 'video_block' : name = 'VideoBlock'; break
        case 'slider_block' : name = 'SliderBlock'; break
        case 'card_list_block' : name = 'CardListBlock'; break
        case 'custom' : name = block.component; break
      }
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.sectional {
  margin: 12rem 0;
}

// .page-content {
//   position: relative;
//   z-index: 5;
// }
//
// .content-section {
//   padding: 5rem 0;
// }
//
// .column-content {
//   position: relative;
// }
//
// .blocks {
//   position: relative;
//   z-index: 10;
// }
</style>
