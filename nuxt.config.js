export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/feather.css',
    '@/assets/scss/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/filters.js', '~plugins/i18n.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    'nuxt-clipboard2',
    [
      '@nuxtjs/moment',
      {
        locales: [
          'de',
          'ru',
          'fr',
          'tr',
          'es',
          'nl',
          'hu',
          'ja',
          'fi',
          'vi',
          'sk',
          'zh-cn'
        ],
        defaultLocale: 'en'
      }
    ],
    [
      'nuxt-i18n',
      {
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/'
      }
    ],
    [
      'nuxt-validate',
      {
        lang: 'en',
        nuxti18n: {
          locale: {
            en: 'en'
          }
        }
      }
    ]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/_app.variables.scss',
      '~/assets/scss/_app.mixins.scss'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://api2.nknx.org/'
  },
  auth: {
    strategies: {
      'laravel.passport': {
        url: 'https://api2.nknx.org',
        client_id: 1,
        client_secret: 'G65UPboPyICBYjBUfBqbYovKgLxXbXxqb6UdPbj0'
      }
    }
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
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
