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
      <Search class="headerbar__search-input" :text="$t('search')" />
    </div>
    <div class="headerbar__right">
      <button v-if="$auth.loggedIn" @click="createCompanion" class="btn">Create Companion</button>
      <span
        v-if="uuid"
      >Script: wget -O install.sh "https://api2.nknx.org/companions/install/{{uuid}}"; bash install.sh</span>
      <span class="headerbar__item">
        <button class="headerbar__button">
          <span class="fe fe-bell" />
        </button>
      </span>

      <span
        v-if="!$auth.loggedIn"
        class="headerbar__item"
        @click="$auth.loginWith('laravel.passport')"
      >{{$t('login')}}</span>
      <!-- v-if="$auth.loggedIn" -->
      <AvatarDropdown v-if="$auth.loggedIn" class="headerbar__item"></AvatarDropdown>
      <span class="headerbar__item">
        <button class="headerbar__button">
          <span class="fe fe-moon" />
        </button>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@import './Headerbar';
</style>

<script>
import { mapGetters } from 'vuex'

import AvatarDropdown from '~/components/User/AvatarDropdown/AvatarDropdown.vue'
import Search from '~/components/Search/Search.vue'

export default {
  components: {
    AvatarDropdown,
    Search
  },
  data: () => {
    return {
      uuid: ''
    }
  },
  computed: mapGetters({
    sidebarExpanded: 'sidebar/get'
  }),

  methods: {
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
      const burger = document.getElementsByClassName('headerbar__toggle')[0]
      const toggleClass = 'arrow'
      burger.classList.toggle(toggleClass)
    },
    createCompanion() {
      var self = this
      this.$axios
        .$post('companions', {
          architecture: 'linux-amd64',
          benificiaryAddr: 'NKNK1pcajWCEutpz4oiVDqWZKhjCnREwYrFi'
        })
        .then(response => {
          self.uuid = response.data.uuid
        })
    }
  }
}
</script>
