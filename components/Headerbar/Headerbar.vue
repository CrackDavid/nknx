<template>
  <div>
    <div class="headerbar">
      <div class="col col_xs_4">
        <div class="row">
          <span class="headerbar__item">
            <div class="headerbar__toggle" @click="toggleSidebar">
              <svg viewBox="300 20 400 600">
                <path
                  id="top"
                  d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                />
                <path id="middle" d="M300,320 L540,320"/>
                <path
                  id="bottom"
                  d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                  transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                />
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
      this.$store.dispatch('sidebar/toggleSidebar')
      const burger = document.getElementsByClassName('headerbar__toggle')[0]
      const crossClass = 'cross'
      burger.classList.toggle(crossClass)
    }
  }
}
</script>
