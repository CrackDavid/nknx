<template>
  <div class="headerbar" :class="sidebarExpanded ? 'headerbar_collapsed' : null">
    <div class="headerbar__left">
      <span class="headerbar__item">
        <div class="headerbar__toggle" @click="toggleSidebar">
          <svg viewBox="40 40 150 120">
            <path
              id="top"
              d="
      M 40, 80
      C 40, 80 120, 80 140, 80
      C180, 80 180, 20  90, 80
      C 60,100  30,120  30,120
    "
            />
            <path id="middle" d="
      M 40,100
      L140,100
    " />
            <path
              id="bottom"
              d="
      M 40,120
      C 40,120 120,120 140,120
      C180,120 180,180  90,120
      C 60,100  30, 80  30, 80
    "
            />
          </svg>
        </div>
      </span>
    </div>
    <h3 class="headerbar__title">{{$t(pageTitle)}}</h3>
    <div class="headerbar__right">
      <span
        v-if="!$auth.loggedIn"
        class="headerbar__item"
        @click="$auth.loginWith('laravel.passport')"
      >{{$t('login')}}</span>
      <!-- v-if="$auth.loggedIn" -->
      <AvatarDropdown v-if="$auth.loggedIn" class="headerbar__item"></AvatarDropdown>
    </div>
  </div>
</template>

<style lang="scss">
@import './Headerbar';
</style>

<script>
import { mapGetters } from 'vuex'

import AvatarDropdown from '~/components/User/AvatarDropdown/AvatarDropdown.vue'

export default {
  components: {
    AvatarDropdown
  },
  data: () => {
    return {
      uuid: ''
    }
  },
  computed: mapGetters({
    sidebarExpanded: 'sidebar/get',
    pageTitle: 'pageTitle/getPageTitle'
  }),

  methods: {
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
      const burger = document.getElementsByClassName('headerbar__toggle')[0]
      const toggleClass = 'arrow'
      burger.classList.toggle(toggleClass)
    }
  }
}
</script>
