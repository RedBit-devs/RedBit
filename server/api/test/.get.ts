export default defineEventHandler(async (event) => {
  try {
    sendEmail({ subject: 'test', text: 'test from app', to: 'developer413ksz@gmail.com' })
  } catch (error) {
    console.log(error)
  }
  return {message:"email sent"}
})
