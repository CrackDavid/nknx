<template>
  <aside class="sidebar" :class="{'sidebar__expanded': sidebarExpanded}">
    <nuxt-link
      to="/"
      class="sidebar__item"
      @click.native="markerInitialize"
      @mouseleave.native="markerInitialize"
    >
      <grid-icon class="sidebar__item__icon"/>
      <span class="sidebar__item__title">Dashboard</span>
    </nuxt-link>
    <nuxt-link
      to="/network"
      class="sidebar__item"
      @click.native="markerInitialize"
      @mouseleave.native="markerInitialize"
    >
      <activity-icon class="sidebar__item__icon"/>
      <span class="sidebar__item__title">Network</span>
    </nuxt-link>
    <div class="sidebar__marker"/>
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
  }),
  mounted: function() {
    this.markerInitialize()
    this.markerMove() // comment it if wanna turn off mouseover animation
  },
  methods: {
    markerInitialize() {
      const marker = document.getElementsByClassName('sidebar__marker')[0]
      const currentActiveElement = document.getElementsByClassName(
        'nuxt-link-exact-active'
      )[0]
      const bodyScrollTop = document.body.scrollTop
      const currentActiveElementOffset =
        currentActiveElement.offsetTop + bodyScrollTop
      marker.style.top = currentActiveElementOffset + 'px'
    },
    markerMove() {
      const totalItems = document.getElementsByClassName('sidebar__item')
      for (let i = 0; i < totalItems.length; i++) {
        totalItems[i].addEventListener('mouseover', function(e) {
          const marker = document.getElementsByClassName('sidebar__marker')[0]
          const currentActiveElement = document.getElementsByClassName(
            'nuxt-link-exact-active'
          )[0]
          const bodyScrollTop = document.body.scrollTop
          const currentActiveElementOffset =
            currentActiveElement.offsetTop + bodyScrollTop
          const currentElement = this
          const currentElementOffset =
            currentElement.offsetTop + bodyScrollTop ||
            currentActiveElementOffset
          marker.style.top = currentElementOffset + 'px'
        })
      }
    }
  }
}
</script>
