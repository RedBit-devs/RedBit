import { createSecretKey } from "crypto"
import { type JWTPayload, SignJWT } from "jose"

export const generateJWT = async (payload: JWTPayload, exp: number |string | Date = '45m') => {
  const config = useRuntimeConfig()
    const secretKey = createSecretKey(config.JWT_SECRET, 'utf-8')

    const newToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS512' })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(secretKey)


       if (!(await verifyJWT(newToken))) {
           throw createError({ statusCode: 500, statusMessage: "Failed to create token" })
       }

       return newToken

}