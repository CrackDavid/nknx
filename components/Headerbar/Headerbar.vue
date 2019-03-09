<template>
  <div>
    <div class="headerbar">
      <div class="col col_xs_4">
        <div class="row">
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
          <input
            class="headerbar__search-input"
            type="text"
            name="search"
            placeholder="Search by Block, Hash or Address"
          >
        </div>
      </div>
      <div class="col col_xs_8">
        <div class="row row_end_xs">
          <span class="headerbar__item">
            <button class="headerbar__button">
              <span class="fe fe-bell"/>
            </button>
          </span>
          <span
            v-if="!$auth.loggedIn"
            class="headerbar__item"
            @click="$auth.loginWith('auth0')"
          >Login</span>
          <span v-if="$auth.loggedIn" class="headerbar__item" @click="$auth.logout()">Logout</span>
          <span class="headerbar__item">
            <button class="headerbar__button">
              <span class="fe fe-moon"/>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toggleSidebar() {
      this.$store.dispatch("sidebar/toggleSidebar");
      const burger = document.getElementsByClassName("headerbar__toggle")[0];
      const toggleClass = "arrow";
      burger.classList.toggle(toggleClass);
    }
  }
};
</script>
