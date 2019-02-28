<template>
  <div>
    <vs-row class="headerbar">
      <vs-col vs-type="flex" vs-align="center" vs-justify="left" vs-w="4" class="headerbar-left">
        <span class="headerbar-item">
          <align-left-icon class="headerbar-toggle" @click="toggleSidebar"></align-left-icon>
        </span>
        <input
          class="headerbar-search-input"
          type="text"
          name="search"
          placeholder="Search by Block, Hash or Address"
        >
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-align="center"
        vs-justify="flex-end"
        vs-w="8"
        class="headerbar-right"
      >
        <span class="headerbar-item">
          <button class="headerbar-button">
            <bell-icon></bell-icon>
          </button>
        </span>
        <span class="headerbar-item"></span>
        <span class="headerbar-item">
          <button class="headerbar-button">
            <moon-icon></moon-icon>
          </button>
        </span>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import { AlignLeftIcon, MoonIcon, BellIcon } from 'vue-feather-icons'

export default {
  components: {
    AlignLeftIcon,
    MoonIcon,
    BellIcon
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
    }
  }
}
</script>
