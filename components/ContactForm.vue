<template>
  <form class="form grid-middle" @submit="onSubmit">

    <div
      v-for="field in fields"
      :key="field.label"
      :class="[(field.cols && field.cols.num) || 'col-12', 'field']">
      <component
        :is="field.component || 'input'"
        v-model="formData.test"
        :placeholder="field.label" />
    </div>

    <div class="submit-container col-2" data-push-left="off-10">
      <input
        class="submit"
        type="submit"
        :value="submit" />
    </div>

  </form>
</template>

<script>
// ===================================================================== Imports
// import TextBlock from '@/components/TextBlock'

// ====================================================================== Export
export default {
  name: 'HomeCallout',

  components: {
    // TextBlock
  },

  props: {
    fields: {
      /* eslint-disable-line */
      type: Array,
      required: true
    },
    submit: {
      /* eslint-disable-line */
      type: String,
      required: true
    }
  },

  data () {
    return {
      formData: {}
    }
  },

  methods: {
    onSubmit (e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
input,
textarea {
  position: relative;
  background: none;
  border: none;
  width: 100%;
  @include fontSize_Small;
  @include fontWeight_Semibold;

  &:focus {
    outline: none;
  }
}

// ///////////////////////////////////////////////////////////////////// Fields
::placeholder {
  color: $cararra;
  @include fontSize_Small;
  @include fontWeight_Semibold;
}

textarea {
  resize: none;
  min-height: 8rem;
}

.field {
  position: relative;
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 2rem;
  }

  &:after {
    width: 100%;
    height: 0.25rem;
    content: "";
    margin-top: 1rem;
    @include gradient_Background_RedPurple;
  }
}

.submit-container {
  padding: 0.5rem 0;
  position: relative;
  text-align: right;
}

.submit {
  width: auto;
}
</style>
