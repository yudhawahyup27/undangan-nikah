// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    supabaseUrl: '',
    supabaseServiceRoleKey: '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nikah.ywp.my.id',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      title: 'The Wedding of Nur Kotimah & Yudha Wahyu Pratama',
      meta: [
        { name: 'description', content: 'Undangan Pernikahan Nur Kotimah & Yudha Wahyu Pratama' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'The Wedding of Nur Kotimah & Yudha Wahyu Pratama' },
        { property: 'og:description', content: 'Dengan penuh kebahagiaan kami mengundang Anda' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@100;200;300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap'
        }
      ]
    }
  },
  nitro: {
    storage: {
      fs: {
        driver: 'fs',
        base: './server/data'
      }
    }
  },
  build: {
    transpile: ['gsap', 'three']
  },
  ssr: false
})
