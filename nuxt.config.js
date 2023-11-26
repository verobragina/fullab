export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fullab',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      {rel: 'icon', sizes: "32x32", href: '/favicon-32x32.png'},
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'icon', sizes: "16x16", href: '/favicon-16x16.png'},
      {rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png'},
      {rel: 'manifest', href: '/site.webmanifest'},
      {rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/styles.scss',
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/components/plugins/click-outside',
    '~/plugin/vue-select',
    '~/plugin/vue-youtube',
    '~/plugin/axios',
    '~/plugin/perfect-scrollbar',
    '~/plugin/vue-js-modal',
    '~/plugin/i18n.js',
    { src: '~/plugin/vue-input-mask', ssr: false },
    { src: '~/plugin/ymapPlugin.js',  mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/svg-sprite',
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
    '@nuxtjs/auth-next',
    'nuxt-user-agent',
    '@nuxtjs/i18n',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
  ],

  svgSprite: {
    input: '~/assets/icons/',
    elementClass: 'base-icon',
    publicPath: "/_nuxt/",
  },

  env: {
    baseUrl: process.env.API_URL,
    domain: process.env.DOMAIN,
  },

  recaptcha: {
    hideBadge: true,
    language: 'ru',
    mode: 'base',
    siteKey: process.env.RECAPTCHA_API_KEY,
    version: 3
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'EN',
        file: 'en.js',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'RU',
        file: 'ru.js',
      },
    ],
    defaultLocale: 'ru',
    alwaysRedirect: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: 'ru',
    }
  },

  axios: {
    baseURL: process.env.API_URL
  },

  // auth: {
  //   redirect: {
  //     login: '/login',
  //     logout: '/',
  //     callback: '/login',
  //     home: '/'
  //   },
  //   strategies: {
  //     local: {
  //       global: true,
  //       scheme: 'local',
  //       token: {
  //         property: 'token',
  //         required: true,
  //       },
  //       user: {
  //         property: 'user',
  //         autoFetch: true
  //       },
  //       endpoints: {
  //         login: {
  //           url: '/api/app/security/token',
  //           method: 'post'
  //         },
  //         logout: {
  //           url: '/security/logout', method: 'post'
  //         },
  //         user: {
  //           url: '/api/app/personal/profile/item', method: 'get'
  //         }
  //       }
  //     }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate', '/plugins/vue-input-mask', 'defu'],
  },

  router: {
    // middleware: [
    //   'auth',
    // ]
  },

  storybook: {
    addons: [
      '@storybook/preset-typescript',
    ],
    component: true,
    modules: {
      // with upgraded storybook, svg-sprite is crashing the storybook build.
      // It's not clear why that is, because it should have been fixed in
      // svg-sprite 0.5.1: https://github.com/nuxt-community/storybook/issues/155
      // That doesn't seem to have worked, however.
      exclude: ["svg-sprite"],
      staticDirs: ['../static', '../assets'],
    },
    stories: [
      '~/components/base/**/*.stories.ts',
    ],
  }
}
