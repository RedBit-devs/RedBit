export default defineNuxtRouteMiddleware(async (to, from) => {

    const { getToken, tokenRefresh, tokenStatus } = useToken()

    console.log("token", getToken());
    
    const token = getToken()

    if (!token) {
        await tokenRefresh()
        
        if (tokenStatus.value !== "success") {
            return navigateTo("/loginPage")
        }
    }

})