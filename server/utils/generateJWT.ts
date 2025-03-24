import { createSecretKey } from "crypto";
import { type JWTPayload, SignJWT } from "jose";

/**
 * Generates a JSON Web Token (JWT) using the given payload and expiration time.
 *
 * This function creates a JWT with the provided payload and sets the
 * expiration time as specified. The token is signed using a secret key
 * fetched from the runtime configuration, employing the HS512 algorithm.
 *
 * @param {JWTPayload} payload - The payload data to be included in the JWT.
 * @param {number | string | Date} [exp='45m'] - The expiration time for the token.
 *        It can be specified as a number (seconds since epoch), a string (e.g. "45m"),
 *        or a Date object.
 *
 * @throws Will throw an error if the token creation fails, indicated by a failed verification.
 *
 * @returns {Promise<string>} - A promise that resolves to the generated JWT.
 */
export const generateJWT = async (
  payload: JWTPayload,
  exp: number | string | Date = "45m"
) => {
  const config = useRuntimeConfig();
  const secretKey = createSecretKey(config.JWT_SECRET, "utf-8");

  // Generate the JWT
  const newToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secretKey);

  if (!(await verifyJWT(newToken))) {
    //Throw error if token creation fails
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create token",
    });
  }

  return newToken;
};
