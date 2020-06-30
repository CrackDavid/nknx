<template>
  <div class="select__wrapper" :class="`select__wrapper_${type}`">
    <div
      class="select__button"
      :class="[open ? 'select__button_active' : null, `select__button_${type}`]"
      @click="toggleSelect()"
    >
      <span v-text="upperCase ? $t(activeItem.toUpperCase()) : $t(activeItem)">
      </span>
      <span
        class="select__icon fe fe-chevron-down"
        :class="open ? 'select__icon_open' : null"
      />
    </div>

    <ul
      class="select__list"
      :class="[open ? 'select__list_open' : null, `select__list_${type}`]"
    >
      <li
        v-for="item in items"
        :key="itemText ? item[itemText] : item"
        class="select__item"
        :class="`select__item_${type}`"
        @click="setSelect(item), toggleSelect()"
        v-text="
          upperCase
            ? itemText
              ? item[itemText].toUpperCase()
              : $t(item.toUpperCase())
            : itemText
            ? item[itemText]
            : $t(item)
        "
      ></li>
    </ul>
  </div>
</template>

<style lang="scss">
@import './Select.scss';
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    activeItem: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    itemText: {
      type: String,
      default: ''
    },
    upperCase: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      open: false
    }
  },
  computed: {},
  methods: {
    toggleSelect() {
      this.open = !this.open
    },
    setSelect(item) {
      this.$emit('update', item)
    }
  }
}
</script>
