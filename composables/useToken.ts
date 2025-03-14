export const useToken = () => {

    //const token = useState("token", () => "");
    const refreshToken = useCookie("refreshToken", { secure: true, sameSite: "strict" });

    //Give new value to refresh token
    const setRefreshToken = (newToken: string): void => {
        refreshToken.value = newToken;
    }

    //Clear refresh token
    const clearRefreshToken = () => {
        refreshToken.value = null;
    }

    //gets an access token
    /**
    * Tryes to get a new access token with the current refreshtoken
    */
    const { data: token, status: tokenStatus, error: tokenError, refresh: tokenRefresh, clear: clearToken } = useFetch("/api/token/refresh", {
        headers: {
            "Authorization": refreshToken.value
        },
        key: "accesTokenFetch",
        immediate: false,
        transform: (e) => e.data.items[0].token
    })


    //Gets a refresh token
    const getNewRefreshToken = async (email: string, password: string) => {
        const { data, error, status } = await useFetch("/api/user/login", {
            method: "POST",
            body: {
                email,
                password
            }
        })

        if (status.value == "error") {
            setRefreshToken(null);
        }

        if (status.value === "success") {
            setRefreshToken(data.value.data.items[0].token);

            await tokenRefresh()
        }

        return { error, status }
    }


    //To get the value of the acces token
    const getToken = () => token?.value;


    return {
        getToken,
        tokenStatus,
        tokenRefresh,
        clearToken,
        clearRefreshToken,
        getNewRefreshToken
    }
}
