export default defineNuxtRouteMiddleware((to, from) => {

    const { token } = useToken()

    if (!token.value) {
        console.log("asd");
        return navigateTo("/loginPage")
    }

})