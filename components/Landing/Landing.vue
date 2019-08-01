<template>
  <div class="landing">
    <header class="landing__header">
      <nav class="landing__nav">
        <Logo class="landing__nav-logo" />
        <div class="landing__nav-menu">
          <a
            v-if="$auth.$state.loggedIn !== true"
            class="landing__nav-link"
            href="https://auth.nknx.org/register"
            target="_blank"
          >Sign up</a>
          <nuxt-link class="landing__nav-btn" to="/dashboard">
            <template v-if="$auth.$state.loggedIn === true">Go to dashboard</template>
            <template v-else>Log In</template>
          </nuxt-link>
        </div>
      </nav>
    </header>
    <main class="landing__content">
      <section class="landing__intro">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="landing__intro-title">
                Welcome to a New Kind of Mining...
                <br />Welcome to NKNx!
              </h1>
              <p
                class="landing__intro-text"
              >NKNx is a node and wallet tracker for NKN blockchain network. We make managing your nodes and wallets easy and convenient.</p>
              <img
                class="landing__intro-img img_responsive"
                src="../../static/dashboard.png"
                alt="nknx dashboard"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="landing__stats">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-users"></span>
                <div class="landing__stats-value">
                  <countTo :startVal="0" :endVal="users" :duration="4000"></countTo>
                </div>
                <div class="landing__stats-descr">Registered Users</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-credit-card"></span>
                <div class="landing__stats-value">
                  <countTo :startVal="0" :endVal="wallets" :duration="4000"></countTo>
                </div>
                <div class="landing__stats-descr">Registered Wallets</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-layers"></span>
                <div class="landing__stats-value">
                  <countTo :startVal="0" :endVal="nodes" :duration="4000"></countTo>
                </div>
                <div class="landing__stats-descr">Registered Nodes</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-percent"></span>
                <div class="landing__stats-value">
                  <countTo :startVal="0" :endVal="percent_watched" :duration="4000" :decimals="2"></countTo>
                </div>
                <div class="landing__stats-descr">of all Nodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="landing__features landing__features_border">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="landing__features-subtitle">Manage your nodes and wallets at one place</div>
              <h2 class="landing__features-title">Node and wallet tracker</h2>
              <p
                class="landing__features-text"
              >You are actively involved in the NKN Network and got problems keeping an eye of your nodes' profitability and performance? Then NKNx is exactly the right tool for you!</p>
              <h3 class="landing__features-heading">Some of our core Features:</h3>
              <ul class="landing__features-list">
                <li class="landing__features-li">
                  <b>All nodes at a glance</b> - view, order and filter them as you like! Our neat status filter allows you to inspect instantly nodes that are not working as intended.
                </li>
                <li class="landing__features-li">
                  <b>Batch adding</b> - Got multiple nodes to monitor? Simply add them with our bulk node inserter! Node IP could be just pasted from your clipboard or added through a separate file.
                </li>
                <li class="landing__features-li">
                  <b>Historical data</b> - Wonder how your nodes perform the last week or month? We got you covered. Our historical data helps you find nodes that didnt perform well in the past,
                </li>
                <li class="landing__features-li">
                  <b>No more wallet confusion</b> - Our multi wallet tracker helps you cleaning up your balances. Watch your overall balance or investigate all wallets on their own. All directly with NKNx.
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <img
                class="landing__features-img landing__features-img_right img_responsive"
                src="../../static/feature-1.png"
                alt
              />
            </div>
          </div>
        </div>
      </section>

      <section class="landing__features landing__features_white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <img
                class="landing__features-img landing__features-img_left img_responsive"
                src="../../static/feature-2.png"
                alt
              />
            </div>
            <div class="col-md-6">
              <div class="landing__features-subtitle">Easily create new nodes</div>
              <h2 class="landing__features-title">Explore Fast Deploy!</h2>
              <p
                class="landing__features-text"
              >With our new NKNx Fast Deploy creating a node is easier than before! We automatically create an installation script for your linux machine and installs a fully functional node for you.</p>
              <h3 class="landing__features-heading">What you can expect</h3>
              <ul class="landing__features-list">
                <li
                  class="landing__features-li"
                >"Grab a coffee" installation of a full NKN Node based on your configuration (BenificiaryAddr, pre-chain download, etc)</li>
                <li
                  class="landing__features-li"
                >One script for all your nodes - passwords get regenerated on every script call and nodes will get automatically added to NKNx after installation.</li>
                <li
                  class="landing__features-li"
                >Works on all Unix-based systems with AMD or ARM-architecture - raspberry pi included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="landing__promo">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="landing__features-title text_align_center">NKNx is more than just an app...</h2>
              <p
                class="landing__intro-text text_color_grey"
              >...it's a whole ecosystem! We're working closely with the NKN team, community and other projects to provide you the things you really need.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/concept.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Community driven</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >The heart of every blockchain project is its community. Therefore we regularly listen to user needs and develop NKNx based on community suggestions and feature requests from you!</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/research.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Actively developed</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >With a team of currently 3 voluntary working members NKNx is regularly updated. As every NKN project NKNx is also open source, so you can actively contribute in development.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/experience.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Down-to-earth</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >We believe that a strong community needs strong community projects - That's why NKNx will always be free to use. Our regular costs are compensated through donations and NKN itself.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/web.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Designed for you</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >Ugly interfaces are so 1990! NKNx was made with the goal to give you the best user interface and a state-of-the-art experience. Also we love glowing eyes when working with our app :)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="landing__mining">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h2 class="landing__features-title">Want to join?</h2>
              <p>
                Joining NKNx is easy and completely free. Just create an account, add your nodes and you're ready to roll! Any questions? Don't hesitate contacting us through eMail
                <a
                  class="landing__mining-link"
                  href="mailto:hello@nknx.org"
                  target="_blank"
                >hello@nknx.org</a> or meet us at the
                <a
                  class="landing__mining-link"
                  href="https://discord.gg/fvK2Egm"
                  target="_blank"
                >official NKN Discord server</a>.
              </p>
            </div>
            <div class="col-md-4">
              <div class="landing__mining-item">
                <nuxt-link class="landing__mining-btn" to="/dashboard">Start Mining</nuxt-link>
              </div>
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
import countTo from 'vue-count-to'

export default {
  components: { Logo, Footer, countTo },
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
        self.users = users
        self.wallets = wallets
        self.nodes = nodes
        self.percent_watched = percent_watched
      })
    }
  }
}
</script>
