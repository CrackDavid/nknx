<template>
  <div class="node-checkbox">
    <input
      v-model="checked"
      class="node-checkbox__control"
      type="checkbox"
      :value="val"
      @change="onChange"
    />
    <label class="node-checkbox__label"></label>
  </div>
</template>

<style lang="scss">
@import './NodeCheckbox.scss';
</style>

<script>
export default {
  components: {},
  props: {
    val: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Array,
      default: () => {}
    }
  },
  data: () => {
    return { checkedProxy: false }
  },
  computed: {
    checked: {
      get() {
        return this.value
      },
      set(val) {
        this.checkedProxy = val
      }
    }
  },
  mounted: function() {},
  methods: {
    onChange(e) {
      this.$emit('input', this.checkedProxy)
    }
  }
}
</script>
