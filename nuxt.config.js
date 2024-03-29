export default {
  server: {
    port : 5011
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hxChatt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/hexabase-sdk'
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
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  proxy: {
    '/linker-api': { 
      // target: 'https://dev-api.hexabase.com',
      target: 'http://localhost:7575',
      pathRewrite: {
        '^/linker-api': '/api/v0'
      }
    },
    // '/hub': {
    //   target: 'http://dev-notificatorv2.hexabase.com',
    //   ws: false
    // }
    // '/signalr/hub': {
    //   target: 'http://localhost:5006',
    //   ws: false,
    //   pathRewrite: {
    //     '^/signalr': '/'
    //   },
    //   ws: true
    // }    
    '/signalr/hub': {
      target: 'http://localhost:9002',
      ws: false,
      pathRewrite: {
        '^/signalr': '/'
      },
      ws: true
    }    
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
