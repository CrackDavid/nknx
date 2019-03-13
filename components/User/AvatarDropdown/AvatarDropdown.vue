<template>
  <div class="avatar-dropdown" v-on-clickaway="showDropDown = false">
    <a href="#" v-on:click.prevent="showDropDown=!showDropDown" class="avatar-dropdown__link">
      <img :src="$auth.user.picture" class="avatar-dropdown__avatar" alt="avatar">
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
            <a href="#" class="avatar-dropdown__dd-link" v-on:click="$auth.logout()">Logout</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  data() {
    return {
      showDropDown: false
    };
  },
  computed: {},
  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
