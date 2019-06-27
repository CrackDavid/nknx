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
            ></path>
            <path id="middle" d="
      M 40,100
      L140,100
    "></path>
            <path
              id="bottom"
              d="
      M 40,120
      C 40,120 120,120 140,120
      C180,120 180,180  90,120
      C 60,100  30, 80  30, 80
    "
            ></path>
          </svg>
        </div>
      </span>
      <Search class="headerbar__search-input" :text="$t('search')"/>
    </div>
    <div class="headerbar__right">
      <button v-if="$auth.loggedIn" @click="getNodes">get nodes</button>
      <button v-if="$auth.loggedIn" @click="addNode">Add nknx node</button>
      <button v-if="$auth.loggedIn" @click="detachNode">detach nknx node</button>
      <button v-if="$auth.loggedIn" @click="addWallet">add wallet</button>

      <span class="headerbar__item">
        <button class="headerbar__button">
          <span class="fe fe-bell"/>
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
          <span class="fe fe-moon"/>
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
  computed: mapGetters({
    sidebarExpanded: 'sidebar/get'
  }),

  methods: {
    getNodes() {
      this.$axios.$get('nodes').then(function(response) {
        console.log(response)
      })
    },
    addNode() {
      this.$axios
        .$post('nodes', {
          label: 'testlabel',
          ip: 'devnet-seed-0001.nkn.org'
        })
        .then(function(response) {
          console.log(response)
        })
    },
    addWallet() {
      this.$axios
        .$post('wallets', {
          label: 'testlabel',
          address: 'NKNUXioUqbq3a8YPTNs3KaHvX4k2tuw54B2o'
        })
        .then(function(response) {
          console.log(response)
        })
    },
    detachNode() {
      this.$axios.$delete('nodes/3').then(function(response) {
        console.log(response.data)
      })
    },
    detachAllNodes() {
      this.$axios.$delete('nodes').then(function(response) {
        console.log(response.data)
      })
    },
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
      const burger = document.getElementsByClassName('headerbar__toggle')[0]
      const toggleClass = 'arrow'
      burger.classList.toggle(toggleClass)
    }
  }
}
</script>
