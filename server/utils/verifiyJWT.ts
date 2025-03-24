import { createSecretKey } from "crypto";
import { jwtVerify } from "jose";

/**
 * Verifies the given JWT token.
 *
 * This function verifies the given JWT token using the secret key
 * specified in the runtime configuration, employing the HS512 algorithm.
 *
 * @param {string} token - The token to be verified.
 *
 * @returns {(Promise<JWTPayload | null>)} - A promise that resolves to the
 *          payload of the verified token, or null if the verification fails.
 */
export const verifyJWT = async (token: string) => {
    const config = useRuntimeConfig()
    const secretKey = createSecretKey(config.JWT_SECRET, 'utf-8')

    let data = null;

    try {
        // Verify the token
        const { payload } = await jwtVerify(token, secretKey, {algorithms:["HS512"]});

        data = payload
    } catch (e) {
        data = null
    }
    // Return the payload
    return data
}