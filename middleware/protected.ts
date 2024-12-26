import jwt from "jsonwebtoken"

export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig()

    type Session = {
        token: string
    }

    const session = useState("session", () => shallowRef<Session>({ token: "" }))

    session.value.token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY201NTh0ZmlkMDAwMHhyN3FvbjJmcXI4biIsImlhdCI6MTczNTIyMDU2MywiZXhwIjoxNzM1MjIwNTY4fQ._TxQ7QnrKhYcZZ2-_-cDc8-_m3b61MkdGnae5Y10eSRlQ058jkQ8y0yohR1AkbkHb4rMo5CcXvwuQ7RlXHp_ow"

    if (!session.value.token) {
        return navigateTo("/loginPage")
    }

    try {
        if (jwt.verify(session.value.token, config.JWT_SECRET)) {
            return navigateTo(to)
        }
    } catch (error) {
        console.log(error.message);

        if (error.message == "jwt expired") {
            //TODO
            //Notify user that his session expired
            console.log("asdasd");

        }
        return navigateTo("/loginPage")
    }

    return navigateTo("/loginPage")
})