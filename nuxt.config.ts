// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
   app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Great+Vibes&display=swap'
        }
      ]
    }
  },
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui'
  ]
})