export default defineNuxtRouteMiddleware((to, from) => {

    const { token } = useToken()

    if (!token.value) {
        return navigateTo("/loginPage")
    }

})