// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig:{
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXP_TIME:"45 minutes",
    JWT_REFR_EXP_TIME:"20 days",
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css'
  ],
  devtools: { enabled: true },
  modules: ["@prisma/nuxt", '@nuxt/icon', '@nuxtjs/device'],
  prisma: {
    installStudio: false,
    autoSetupPrisma: true
  },
  typescript:{
    typeCheck: true,
    strict: false
  },
  vite:{
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  }
})
