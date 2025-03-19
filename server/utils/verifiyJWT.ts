import { createSecretKey } from "crypto";
import { jwtVerify } from "jose";

export const verifyJWT = async (token: string) => {
    const config = useRuntimeConfig()
    const secretKey = createSecretKey(config.JWT_SECRET, 'utf-8')

    let data = null;

    try {
        const { payload } = await jwtVerify(token, secretKey, {algorithms:["HS512"]});

        data = payload
    } catch (e) {
        data = null
    }

    return data
}