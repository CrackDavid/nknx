<template>
  <div class="landing">
    <header class="landing__header">
      <nav class="landing__nav">
        <Logo class="landing__nav-logo" />
      </nav>
    </header>
    <main class="landing__content">
      <section class="landing__intro">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="landing__intro-title">
                New things are on the rise...
                <br />NKNx is having a break!
              </h1>
              <p
                class="landing__intro-text"
              >We will be back on June 30th with some major improvements!</p>
              <img
                class="landing__intro-img img_responsive"
                src="../../static/dashboard.png"
                alt="nknx dashboard"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  </div>
</template>

<style  lang="scss" src="./Landing.scss" >
</style>

<script>

import Logo from '~/assets/icons/logo.svg'
import Footer from '~/components/Footer/Footer.vue'

export default {
  components: { Logo, Footer },
  data: () => {
    return {
      users: 0,
      wallets: 0,
      nodes: 0,
      percent_watched: 0
    }
  },
  mounted: function() {
    this.getStats()
  },
  methods: {
    getStats() {
      const self = this

      this.$axios.get('statistics/nknx').then(response => {
        const { users, wallets, nodes, percent_watched } = response.data
        self.users = Number(users)
        self.wallets = Number(wallets)
        self.nodes = Number(nodes)
        self.percent_watched = percent_watched
      })
    }
  }
}
</script>
