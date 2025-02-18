export const useToken = () => {
 
    const token = useCookie("token", {sameSite:"strict"})

    const setToken = (newToken: string) => {
            token.value = newToken;
    }
    const clearToken = () => {
        token.value = null
    }
    
    

    return {
        token,
        setToken,
        clearToken
    }
}
