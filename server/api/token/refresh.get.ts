import { type CustomErrorMessage } from "~/types/customErrorMessage";
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const customErrorMessages: CustomErrorMessage[] = [];
    const apiResponse = {} as ApiResponse;
  
    apiResponse.context = "Token/Refresh";
    apiResponse.method = "GET";
    event.context.apiResponse = apiResponse;
  

    if (!event.context.auth) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const tokenData = {
        user: {
            id: event.context.auth.user.id,
            email: event.context.auth.user.email
        },
    }

    const token = `Bearer ${jwt.sign(
        tokenData,
        config.JWT_SECRET,
        {
            algorithm: "HS512",
            expiresIn: config.JWT_EXP_TIME,
        }
    )
        }`


    apiResponse.data = {
        totalItems: 1,
        items: [
            {
                token
            }
        ]
    }


    return apiResponse
})