<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js'

export default {
  // inheritAttrs: false, //means the attributes
  // //dont set, which is why we set them in the line above
  mixins: [formFieldMixin],
  props: {
    value: [String, Number],
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      }
    },
  },
  // props: {,
  //   label: {
  //     type: String,
  //     default: '',
  //   },
  //   value: [String, Number],
  // },
  // methods: {
  //   updateValue(event) {
  //     this.$emit('input', event.target.value)
  //   },
  // },
}
</script>

<style scoped></style>
