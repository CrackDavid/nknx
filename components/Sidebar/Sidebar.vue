<template>
  <aside
    class="sidebar"
    :class="[
      { sidebar_expanded: sidebarExpanded },
      topbarExpanded ? 'sidebar_topbar' : null
    ]"
  >
    <nuxt-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      :exact="route.path == '/' ? true : false"
      class="sidebar__item"
      :class="
        route.path === '/account-settings' ? 'sidebar__item_hidden' : null
      "
      @click.native="
        markerInitialize(),
          $mq === 'xs' || $mq === 'sm' || $mq === 'md' ? toggleSidebar() : false
      "
      @mouseleave.native="markerInitialize"
    >
      <span class="fe sidebar__icon" :class="route.icon" />
      <span class="sidebar__title">{{ $t(route.title) }}</span>
    </nuxt-link>
    <div
      class="sidebar__marker"
      :class="
        $route.path === '/account-settings' ? 'sidebar__marker_hidden' : null
      "
    />
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
          path: '/dashboard',
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
        },
        {
          path: '/fast-deploy',
          icon: 'fe-zap',
          title: 'fastDeploy'
        },
        {
          path: '/account-settings',
          icon: 'fe-settings',
          title: 'accountSettings'
        }
      ]
    }
  },
  computed: mapGetters({
    sidebarExpanded: 'sidebar/get',
    topbarExpanded: 'topbar/getTopbar'
  }),
  mounted() {
    this.markerInitialize()
    this.markerMove() // comment it if wanna turn off mouseover animation
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
      const burger = document.getElementsByClassName('headerbar__toggle')[0]
      const toggleClass = 'arrow'
      burger.classList.toggle(toggleClass)
    },
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
