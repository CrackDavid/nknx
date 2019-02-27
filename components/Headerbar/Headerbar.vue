<template>
  <div>
      <vs-row class="headerbar">
          <vs-col vs-type="flex" vs-align="center" vs-w="10">
              <align-left-icon class="headerbar-toggle" @click="toggleSidebar"></align-left-icon>
          </vs-col>
      </vs-row>
  </div>
</template>
<script>
import { AlignLeftIcon } from 'vue-feather-icons'

export default {
  components: {
    AlignLeftIcon
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
    }
  }
}
</script>
