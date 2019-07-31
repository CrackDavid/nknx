<template>
  <div class="landing">
    <header class="landing__header">
      <nav class="landing__nav">
        <Logo class="landing__nav-logo" />
        <nuxt-link class="landing__nav-btn" to="/dashboard">
          <template v-if="$auth.$state.loggedIn === true">Go to dashboard</template>
          <template v-else>Log In</template>
        </nuxt-link>
      </nav>
    </header>
    <main class="landing__content">
      <section class="landing__intro">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1
                class="landing__intro-title"
              >The best landing page to bring new customers to your business</h1>
              <p
                class="landing__intro-text"
              >Feugiat primis ligula risus auctor augue egestas and mauris viverra tortor in iaculis magna undo ipsum mauris in placerat feugiat ligula risus auctor</p>
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
                <div class="landing__stats-value">{{10000 | commaNumber}}</div>
                <div class="landing__stats-descr">Total Downloads</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-activity"></span>
                <div class="landing__stats-value">{{10000 | commaNumber}}</div>
                <div class="landing__stats-descr">Total Downloads</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-globe"></span>
                <div class="landing__stats-value">{{10000 | commaNumber}}</div>
                <div class="landing__stats-descr">Total Downloads</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="landing__stats-item">
                <span class="landing__stats-icon fe fe-heart"></span>
                <div class="landing__stats-value">{{10000 | commaNumber}}</div>
                <div class="landing__stats-descr">Total Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="landing__features landing__features_border">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="landing__features-subtitle">Beauty of nkn</div>
              <h2 class="landing__features-title">We are making design better for everyoney</h2>
              <p
                class="landing__features-text"
              >An enim nullam tempor sapien gravida donec pretium ipsum porta justo integer at odio velna vitae auctor integer congue magna purus pretium ligula rutrum luctus ultrice aliquam a augue suscipit</p>
              <h3 class="landing__features-heading">Features Never Stop</h3>
              <ul class="landing__features-list">
                <li
                  class="landing__features-li"
                >Fringilla risus nec luctus mauris orci auctor purus euismod pretium purus pretium ligula rutrum tempor sapien</li>
                <li
                  class="landing__features-li"
                >Fringilla risus nec luctus mauris orci auctor purus euismod pretium purus pretium ligula rutrum tempor sapien</li>
                <li
                  class="landing__features-li"
                >Fringilla risus nec luctus mauris orci auctor purus euismod pretium purus pretium ligula rutrum tempor sapien</li>
              </ul>
            </div>
            <div class="col-md-6">
              <img
                class="landing__features-img_right img_responsive"
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
                class="landing__features-img_left img_responsive"
                src="../../static/feature-1.png"
                alt
              />
            </div>
            <div class="col-md-6">
              <div class="landing__features-subtitle">Beauty of nkn</div>
              <h2 class="landing__features-title">We are making design better for everyoney</h2>
              <p
                class="landing__features-text"
              >An enim nullam tempor sapien gravida donec pretium ipsum porta justo integer at odio velna vitae auctor integer congue magna purus pretium ligula rutrum luctus ultrice aliquam a augue suscipit</p>
              <h3 class="landing__features-heading">Features Never Stop</h3>
              <ul class="landing__features-list">
                <li
                  class="landing__features-li"
                >Fringilla risus nec luctus mauris orci auctor purus euismod pretium purus pretium ligula rutrum tempor sapien</li>
                <li
                  class="landing__features-li"
                >Fringilla risus nec luctus mauris orci auctor purus euismod pretium purus pretium ligula rutrum tempor sapien</li>
                <li
                  class="landing__features-li"
                >Fringilla risus nec luctus mauris orci auctor purus euismod pretium purus pretium ligula rutrum tempor sapien</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="landing__promo">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2
                class="landing__features-title text_align_center"
              >We are making design better for everyoney</h2>
              <p
                class="landing__intro-text text_color_grey"
              >Aliquam a augue suscipit, luctus neque purus ipsum neque dolor primis libero at tempus, blandit posuere ligula varius congue cursus porta feugiat</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/concept.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Concept & Idea</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >Maecenas laoreet augue egestas laoreet augue egestas, congue gestas volutpat posuere cubilia congue ipsum mauris lectus laoreet gestas neque volutpat and gestas posuere congue ipsum</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/research.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Concept & Idea</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >Maecenas laoreet augue egestas laoreet augue egestas, congue gestas volutpat posuere cubilia congue ipsum mauris lectus laoreet gestas neque volutpat and gestas posuere congue ipsum</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/experience.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Concept & Idea</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >Maecenas laoreet augue egestas laoreet augue egestas, congue gestas volutpat posuere cubilia congue ipsum mauris lectus laoreet gestas neque volutpat and gestas posuere congue ipsum</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__promo-item">
                <img class="landing__promo-icon" src="../../static/web.png" />
                <div class="landing__promo-content">
                  <h3 class="landing__features-heading">Concept & Idea</h3>
                  <p
                    class="landing__promo-text text_color_grey"
                  >Maecenas laoreet augue egestas laoreet augue egestas, congue gestas volutpat posuere cubilia congue ipsum mauris lectus laoreet gestas neque volutpat and gestas posuere congue ipsum</p>
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
              <p>NKN is a New Kind of Network, a Cellular Automata powered, decentralized data relay network built on Blockchain & incentivized by a native token.</p>
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

export default {
  components: { Logo, Footer },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>
