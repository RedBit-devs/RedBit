export default defineEventHandler(async (event) => {
    const newUser : User = await readBody(event)


    return {
        message: "User created"
     }
  })