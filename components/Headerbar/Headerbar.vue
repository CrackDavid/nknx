<template>
  <div>
    <vs-row class="headerbar">
      <vs-col vs-type="flex" vs-align="center" vs-justify="left" vs-w="4" class="headerbar-left">
        <span class="headerbar-item">
          <div class="headerbar-toggle" @click="toggleSidebar">
            <svg viewBox="300 20 400 600">
              <path
                id="top"
                d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
              />
              <path id="middle" d="M300,320 L540,320"/>
              <path
                id="bottom"
                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
              />
            </svg>
          </div>
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
            <bell-icon/>
          </button>
        </span>
        <span class="headerbar-item"/>
        <span class="headerbar-item">
          <button class="headerbar-button">
            <moon-icon/>
          </button>
        </span>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import { MoonIcon, BellIcon } from 'vue-feather-icons'

export default {
  components: {
    MoonIcon,
    BellIcon
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
      const burger = document.getElementsByClassName('headerbar-toggle')[0]
      const crossClass = 'cross'
      burger.classList.toggle(crossClass)
    }
  }
}
</script>
