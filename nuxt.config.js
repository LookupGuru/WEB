export default {
  head: {
    title: 'Discord Search ID',
    titleTemplate: '%s - Lookup.Guru',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover'
      },
      { name: 'format-detection', content: 'telephone=no' },

      {
        rel: 'search',
        type: 'application/opensearchdescription+xml',
        title: 'lookup.guru',
        href: '/opensearch.xml?v2'
      },

      { rel: 'canonical', href: 'https://lookup.guru/' },

      { hid: 'title', name: 'title', content: 'Discord Search ID - Lookup.Guru' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Lookup.Guru is a free and open source Discord search engine. It allows you to search for Discord IDs and get information about them.'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Discord Search ID, Discord Lookup, Discord ID Lookup, Discord ID Finder, Discord Look Up, Discord ID Tracker, Discord ID Search, Discord ID, Discord Search, Lookup.Guru, Lookup Guru, Discord, Search, ID, Lookup, Guru'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/clipboard.js', mode: 'client' },
    { src: '~/plugins/tooltip.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/i18n'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3600',
    headers: {
      common: {
        'Access-Control-Allow-Credentials': true,
        Accept: 'application/json'
      }
    },
    withCredentials: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 8080
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'tr',
        file: 'tr-TR.js'
      },
      {
        code: 'de',
        file: 'de-DE.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.js'
      },
      {
        code: 'ru',
        file: 'ru-RU.js'
      },
      {
        code: 'dk',
        file: 'dk-DK.js'
      },
      {
        code: 'pt',
        file: 'pt-PT.js'
      }
    ],
    langDir: 'lang/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'LookupGuruLanguage'
    }
  }
}
