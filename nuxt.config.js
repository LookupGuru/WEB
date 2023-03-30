export default {
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      title: 'Discord Search ID',
      titleTemplate: '%s - Lookup.Guru',
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=0.5'
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
        ...i18nHead.meta
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }, ...i18nHead.link]
    }
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
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/i18n'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://lookupguru.herokuapp.com/' : 'http://localhost:3600/',
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

  googleAnalytics: {
    id: 'UA-89120054-6'
  },

  server: {
    port: 8080
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
        iso: 'en-US'
      },
      {
        code: 'tr',
        file: 'tr-TR.js',
        iso: 'tr-TR'
      },
      {
        code: 'de',
        file: 'de-DE.js',
        iso: 'de-DE'
      },
      {
        code: 'fr',
        file: 'fr-FR.js',
        iso: 'fr-FR'
      },
      {
        code: 'ru',
        file: 'ru-RU.js',
        iso: 'ru-RU'
      },
      {
        code: 'dk',
        file: 'dk-DK.js',
        iso: 'dk-DK'
      },
      {
        code: 'pt',
        file: 'pt-PT.js',
        iso: 'pt-PT'
      },
      {
        code: 'gr',
        file: 'gr-GR.js',
        iso: 'gr-GR'
      },
      {
        code: 'es',
        file: 'es-ES.js',
        iso: 'es-ES'
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
