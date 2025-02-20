export default defineNuxtRouteMiddleware(async (to, from) => {

    const { getToken, getNewToken } = useToken()

    const token = getToken()

    if (!token) {

        const sucess = await getNewToken()
        if (!sucess) {
            return navigateTo("/loginPage")
        }
    }

})