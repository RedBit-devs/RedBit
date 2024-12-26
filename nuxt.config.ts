// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig:{
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXP_TIME:process.env.JWT_EXP_TIME
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css'
  ],
  devtools: { enabled: true },
  modules: ["@prisma/nuxt", '@nuxt/icon'],
  prisma: {
    installStudio: false,
    autoSetupPrisma: true
  },
  typescript:{
    typeCheck: true,
    strict: false
  }
})
