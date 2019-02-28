<template>
  <aside class="sidebar" :class="{'sidebar-expanded': sidebarExpanded}">
    <nuxt-link to="/" class="sidebar-item">
      <grid-icon class="sidebar-item__icon"></grid-icon>
      <span class="sidebar-item__title">Dashboard</span>
    </nuxt-link>
    <nuxt-link to="/network" class="sidebar-item">
      <activity-icon class="sidebar-item__icon"></activity-icon>
      <span class="sidebar-item__title">Network</span>
    </nuxt-link>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

// Icons
import { GridIcon, ActivityIcon } from 'vue-feather-icons'

export default {
  components: {
    GridIcon,
    ActivityIcon
  },
  data: () => {
    return {}
  },
  computed: mapGetters({
    sidebarExpanded: 'sidebar/get'
  })
}
</script>
