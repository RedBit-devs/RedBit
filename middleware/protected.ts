export default defineNuxtRouteMiddleware(async (to, from) => {

    const { getToken, tokenRefresh, tokenStatus } = useToken()

    if (!getToken()) {
        await tokenRefresh()
        
        if (tokenStatus.value !== "success") {
            return navigateTo("/loginPage")
        }
    }

})