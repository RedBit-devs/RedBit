export const useToken = () => {
    const token = useState("token", () => '')

    const setToken = (newToken: string) => {
        token.value = newToken;
    }
   

    return {
        token,
        setToken,
    }
}