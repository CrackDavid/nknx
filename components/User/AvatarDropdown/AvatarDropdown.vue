<template>
  <div class="avatar-dropdown">
    <a
      v-on-clickaway="closeDropdown"
      class="avatar-dropdown__link"
      href="#"
      @click.prevent="showDropDown=!showDropDown"
    >
      <img src="~assets/icons/avatar.png" class="avatar-dropdown__avatar" alt="avatar" />
      <i
        :class="{ 'fe-chevron-up': showDropDown, 'fe-chevron-down': !showDropDown }"
        class="fe"
        aria-hidden="true"
      ></i>
    </a>
    <transition tag="div" name="slide-fade" style="  position: relative;">
      <div v-if="showDropDown">
        <ul class="avatar-dropdown__menu">
          <li>
            <a href="#" class="avatar-dropdown__dd-link">Account</a>
          </li>
          <li>
            <a href="#" class="avatar-dropdown__dd-link" @click="logout">Logout</a>
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
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  data() {
    return {
      showDropDown: false
    }
  },
  computed: {},
  destroyed() {},
  mounted: function() {},
  methods: {
    logout: function() {
      var self = this
      this.$axios
        .$post(`https://auth.nknx.org/oauth/me/logout`)
        .then(response => {
          self.$auth.logout()
        })
    },
    closeDropdown: function() {
      this.showDropDown = false
    }
  }
}
</script>
