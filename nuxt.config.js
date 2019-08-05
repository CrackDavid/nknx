require('dotenv').config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - NKNx',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'content-type',
        content:
          'text/html'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: 'NKNx is a node and wallet tracker for NKN blockchain network. We make managing your nodes and wallets easy and convenient.' },
      { name: 'og:title', content: "NKNx" },
      { name: 'og:description', content: 'NKNx is a node and wallet tracker for NKN blockchain network. We make managing your nodes and wallets easy and convenient.' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://beta.nknx.org' },
      { name: 'og:image', content: 'https://beta.nknx.org/thumbnail.jpg' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@nknX_org' },
      { name: 'twitter:title', content: "NKNx" },
      { name: 'twitter:description', content: 'NKNx is a node and wallet tracker for NKN blockchain network. We make managing your nodes and wallets easy and convenient.' },
      { name: 'twitter:image', content: 'https://beta.nknx.org/thumbnail.jpg' },
      { name: 'twitter:image:alt', content: 'NKNx Logo' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
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
    '~/assets/css/grid.css',
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
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    'nuxt-clipboard2',
    'nuxt-mq',
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
  mq: {
    defaultBreakpoint: 'default',
    breakpoints: {
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1200,
      llg: 1440,
      xl: Infinity
    }
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
        url: 'https://auth.nknx.org',
        client_id: process.env.CLIENT_ID || 2,
        client_secret:
          process.env.CLIENT_SECRET ||
          'ZU8x5QZ4hhvM5bLvSL1ZsDJQIg5Z9vmdvQYoQx0d',
        userinfo_endpoint: 'https://auth.nknx.org/oauth/me'
      }
    },
    redirect: {
      home: '/dashboard'
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
