const pkg = require("./package");

module.exports = {
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900&amp;subset=cyrillic"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/reset.css",
    "~/assets/css/feather.css",
    "@/assets/scss/main.scss"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["~plugins/filters.js", "~/plugins/vue-select"],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    [
      "nuxt-i18n",
      {
        defaultLocale: "en",
        locales: [
          {
            code: "en",
            iso: "en-US",
            file: "en-US.js"
          }
        ],
        lazy: true,
        langDir: "lang/"
      }
    ],
    "~/modules/auth",
    "nuxt-svg-loader",
    "@nuxtjs/moment",
    "nuxt-clipboard2"
  ],

  auth: {
    redirect: {
      login: "/",
      logout: "/",
      callback: "/login",
      home: "/"
    },
    strategies: {
      auth0: {
        domain: "nknx.eu.auth0.com",
        client_id: "CTgPWjFasyofBnyPzz3tvf1c36HyVTWv",
        audience: "https://api2.nknx.org",
        scope: ["openid", "profile", "email"],
        response_type: "token id_token"
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
