import {sendEmail} from "~/server/utils/mailingService"
export default defineEventHandler(async (event) => {
  try {
    sendMail({ subject: 'test', text: 'test from app', to: 'developer413ksz@gmail.com' })
  } catch (error) {
    console.log(error)

  }
  return {message:"email sent"}
})
