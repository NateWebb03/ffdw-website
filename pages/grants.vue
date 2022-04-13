<template>
  <div :class="[`page page-${tag}`]">
    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from "vuex";

import GrantsPageData from "@/content/pages/grants.json";

import Modal from "@/components/Modal";
import HeaderSelector from "@/components/HeaderSelector";
import BlockBuilder from "@/components/BlockBuilder";

// ====================================================================== Export
export default {
  name: "PageGrants",

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
  },

  data() {
    return {
      tag: "grants",
    };
  },

  async fetch({ store }) {
    await store.dispatch("global/getBaseData", "general");
    await store.dispatch("global/getBaseData", {
      key: "grants",
      data: GrantsPageData,
    });
  },

  head() {
    return this.$CompileSeo(this.$GetSeo(this.tag));
  },

  computed: {
    ...mapGetters({
      siteContent: "global/siteContent",
    }),
    pageData() {
      return this.siteContent[this.tag];
    },
    sections() {
      return this.siteContent[this.tag].page_content;
    },
    header() {
      return this.pageData.header;
    },
  },
};
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #info_0 {
  padding-bottom: 3rem;
  @include small {
    padding-bottom: 2rem;
  }
  .image-block {
    @include small {
      margin-bottom: 3rem;
    }
  }
}

::v-deep #info_1 {
  @include small {
    padding-bottom: 2rem;
  }
  .image-block {
    @include small {
      margin-bottom: 3rem;
    }
    &:before {
      content: "";
      position: absolute;
      right: 100%;
      top: -3rem;
      width: 2rem;
      height: calc(50% + 3rem);
      background-color: $coralRed;
      @include tiny {
        width: 1.25rem;
      }
    }
  }
}

::v-deep #info_2 {
  padding-top: 0;
  .text-block {
    @include small {
      padding-right: 1rem;
    }
    &:after {
      content: "";
      position: absolute;
      left: calc(100% + #{math.div($containerWidth, 12)});
      top: 2rem;
      width: 2rem;
      height: 160%;
      background-color: $perfume;
      @include containerMaxMQ {
        left: 100%;
        width: 1.25rem;
      }
      @include small {
        top: 90%;
      }
      @include mini {
        height: 80%;
      }
    }
  }
}

::v-deep #project_areas {
  padding-top: 0;
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    @include mini {
      flex-direction: column-reverse;
      align-items: flex-end;
    }
  }
  .image-block {
    @include mini {
      margin: 5rem 0;
    }
  }
}

::v-deep #accordion_1 {
  @include mini {
    padding: 0;
  }
}

::v-deep #application_process {
  @include small {
    padding-bottom: 0;
  }
  .text-block {
    @include small {
      margin-top: 3rem;
    }
  }
}

::v-deep #proposal_template {
  padding-top: 0;
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .image-block {
    @include small {
      margin: 5rem 0;
    }
    &:after {
      content: "";
      position: absolute;
      left: 100%;
      bottom: 70%;
      width: 2rem;
      height: 100%;
      background-color: $perfume;
      @include mini {
        bottom: 50%;
        height: 80%;
        width: 1.25rem;
      }
    }
  }
  .button {
    .icon-after.arrow-down {
      svg {
        width: 0.75rem;
        transform: rotate(-90deg);
        rect {
          fill: $coralRed;
        }
      }
    }
  }
}

::v-deep #accordion_2 {
  padding-top: 3rem;
  padding-bottom: 0;
}
</style>
