export default defineEventHandler(async (event) => {
    
    const token = getHeader(event, "Authorization")?.replace("Bearer ", '')
    if (token) {
        const data = await verifyJWT(token);
        event.context.auth = data;
    }
  })