/**
 * Nuxt middleware to handle authentication.
 *
 * This middleware will check if an `Authorization` header is present and if it is a valid token.
 * If the token is valid, it will add an `auth` property
 * to the `event.context` object with the user data.
 *
 * @param {import('nuxt').MiddlewareContext} event - The Nuxt middleware context.
 * @returns {Promise<void>}
 */
export default defineEventHandler(async (event) => {
    
    const token = getHeader(event, "Authorization")?.replace("Bearer ", '')
    if (token) {
        const data = await verifyJWT(token);
        event.context.auth = data;
    }
  })