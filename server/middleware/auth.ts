import jwt from "jsonwebtoken"

export default defineEventHandler((event) => {
    
    const token = getHeader(event, "Authorization")?.split(' ')[1]
    if (token) {
        event.context.auth = jwt.decode(token)
    }
  })