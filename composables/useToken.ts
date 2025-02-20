export const useToken = () => {

    const token = useState("token", () => "");
    const refreshToken = useCookie("refreshToken", { secure: true, sameSite: "strict" });


    const getToken = () => token.value;

    const setToken = (newToken: string): void => {
        token.value = newToken;
    }
    const setRefreshToken = (newToken: string): void => {
        refreshToken.value = newToken;
    }
    const clearRefreshToken = () => {
        refreshToken.value = null;
    }
    const clearToken = () => {
        token.value = null;
    }

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
