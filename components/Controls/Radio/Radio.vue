<template>
  <div class="radio">
    <input
      v-model="radioButtonValue"
      class="radio__control"
      type="radio"
      :value="label"
      :name="name"
    />
    <label class="radio__label"></label>
    <span class="radio__text">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="scss">
@import './Radio.scss';
</style>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
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
