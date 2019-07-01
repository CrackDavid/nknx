<template>
  <aside class="sidebar" :class="{'sidebar_expanded': sidebarExpanded}">
    <nuxt-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      :exact="route.path=='/' ? true : false"
      class="sidebar__item"
      @click.native="markerInitialize"
      @mouseleave.native="markerInitialize"
    >
      <span class="fe sidebar__icon" :class="route.icon" />
      <span class="sidebar__title">{{$t(route.title)}}</span>
    </nuxt-link>
    <div class="sidebar__marker" />
  </aside>
</template>

<style lang="scss">
@import './Sidebar';
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      routes: [
        {
          path: '/',
          icon: 'fe-grid',
          title: 'dashboard'
        },
        {
          path: '/network',
          icon: 'fe-activity',
          title: 'network'
        },
        {
          path: '/wallet-tracker',
          icon: 'fe-credit-card',
          title: 'walletTracker'
        },
        {
          path: '/node-manager',
          icon: 'fe-layers',
          title: 'nodeManager'
        }
      ]
    }
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
        'nuxt-link-active'
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
            'nuxt-link-active'
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
