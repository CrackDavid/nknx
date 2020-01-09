<template>
  <div class="avatar-dropdown">
    <a
      v-on-clickaway="closeDropdown"
      class="avatar-dropdown__link"
      href="#"
      @click.prevent="showDropDown = !showDropDown"
    >
      <img
        :src="`https://api.nknx.org/storage/avatars/${userData.avatar}`"
        class="avatar-dropdown__avatar"
        alt="avatar"
      />
      <i
        :class="{
          'fe-chevron-up': showDropDown,
          'fe-chevron-down': !showDropDown
        }"
        class="fe"
        aria-hidden="true"
      ></i>
    </a>
    <transition tag="div" name="slide-fade" style="  position: relative;">
      <div v-if="showDropDown">
        <ul class="avatar-dropdown__menu">
          <li>
            <a href="#" class="avatar-dropdown__dd-link" @click="openSettings"
              >Account</a
            >
          </li>
          <li>
            <a href="#" class="avatar-dropdown__dd-link" @click="logout"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@import './AvatarDropdown';
</style>

<script>
import { mapGetters } from 'vuex'

import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  data() {
    return {
      showDropDown: false
    }
  },
  computed: {
    ...mapGetters({
      userData: 'userData/getUserData'
    })
  },
  destroyed() {},
  mounted() {},
  methods: {
    logout() {
      this.$auth.logout().then(function() {
        window.location.href = 'https://auth.nknx.org/logout'
      })
    },
    closeDropdown() {
      this.showDropDown = false
    },
    openSettings() {
      this.$router.push({ path: `/account-settings` })
    }
  }
}
</script>
