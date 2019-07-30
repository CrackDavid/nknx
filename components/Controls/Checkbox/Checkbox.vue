<template>
  <div class="checkbox">
    <input
      v-model="radioButtonValue"
      class="checkbox__control"
      type="checkbox"
      :checked="value"
      :name="name"
    />
    <label class="checkbox__label"></label>
    <span class="checkbox__text">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="scss">
@import './Checkbox.scss';
</style>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    radioButtonValue: {
      get: function() {
        return this.value
      },
      set: function() {
        this.$emit('change', this.label)
      }
    }
  }
}
</script>
