export const useToken = () => {

    const token = useState("token", () => "");
    const refreshToken = useCookie("refreshToken", { secure: true, sameSite: "strict" });

    //To get the value of the acces token
    const getToken = () => token.value;

    //Give new value to access token
    const setToken = (newToken: string): void => {
        token.value = newToken;
    }

    //Give new value to refresh token
    const setRefreshToken = (newToken: string): void => {
        refreshToken.value = newToken;
    }

    //Clear refresh token
    const clearRefreshToken = () => {
        refreshToken.value = null;
    }

    //Clear access token
    const clearToken = () => {
        token.value = null;
    }

    //gets an access token
    /**
    * Tryes to get a new access token with the current refreshtoken
    * If the refreshtoken is not valid then the function returns { false }
    * othervise true
    *
    * @return {Boolean} - Success
    */
    const getNewToken = async () => {
        const { data, status, error } = await useFetch("/api/token/refresh", {
            headers: {
                "Authorization": refreshToken.value
            }
        })

        if (status.value == "error") {
            setToken(null);
            return false
        }

        if (status.value === "success") {
            setToken(data.value.data.items[0].token);
            return true
        }
    }

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

            await getNewToken()
        }

        return { error, status }
    }



    return {
        getToken,
        clearToken,
        clearRefreshToken,
        getNewToken,
        getNewRefreshToken
    }
}
