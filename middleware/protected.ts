/**
 * This middleware is used to protect routes that require the user to be logged in.
 * It checks if the user has a valid token, and if not, redirects them to the login page.
 *
 * @param to - The route that the user is trying to access
 * @param from - The route that the user is coming from
 */
export default defineNuxtRouteMiddleware(async (to, from) => {

    const { getToken, tokenRefresh, tokenStatus } = useToken()

    if (!getToken()) {
        await tokenRefresh()

        if (tokenStatus.value !== "success") {
            return navigateTo("/loginPage")
        }
    }
})