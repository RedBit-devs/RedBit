export default defineNuxtRouteMiddleware(async (to, from) => {

    const { getToken, tokenRefresh, tokenStatus } = useToken()

    const token = getToken()

    if (!token) {
        await tokenRefresh()
        
        if (tokenStatus.value !== "success") {
            return navigateTo("/loginPage")
        }
    }

})