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
  modules: ["@prisma/nuxt", '@nuxt/icon', '@nuxtjs/device', 'nuxt-nodemailer'],
  modules: ["@prisma/nuxt", '@nuxt/icon', '@nuxtjs/device', '@vueuse/nuxt', 'nuxt-file-storage'],
  prisma: {
    installStudio: false,
    autoSetupPrisma: true
  },
  typescript:{
    typeCheck: true,
    strict: false
  },

  nodemailer: {
    from: `"RedBitTeam" <${process.env.NUXT_NODEMAILER_FROM}>`,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NUXT_NODEMAILER_FROM,
      pass: process.env.NUXT_NODEMAILER_AUTH_PASS,
    },
  },
  vite:{
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  },
  nitro: {
    experimental: {
      websocket: true
    }
  },
  app:{
    head: {
      link:[
        {rel: "icon", type: "image/svg+xml", href:"logos.svg" }
      ]
    }
  },
  fileStorage:{
    mount: "./" // I just dont understand what does this do, sooooo... leave it like this
  }
})

