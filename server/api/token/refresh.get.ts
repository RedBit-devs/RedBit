import prisma from "~/lib/prisma";
import { errorExpectedFroms, errorReasons, type CustomErrorMessage } from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiResponse = {} as ApiResponse;
    const errorMessages: CustomErrorMessage[] = []

    apiResponse.context = "Token/Refresh";
    apiResponse.method = "GET";
    event.context.apiResponse = apiResponse;


    if (!event.context.auth) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    if (!event.context.auth.user.verification_code ) {
        throw createError({ statusCode: 400, statusMessage:"Bad Request", message: "Expected refresh token, got access token" });
    }

    const tokenvalidation = await prisma.user.findFirst({
        where: {
            id: event.context.auth.user.id
        },
        select: {
            verification_code: true,
            id: true,
            email: true,
            profile_picture: true,
            username: true
        }
    })

    if (event.context.auth.user.verification_code !== tokenvalidation?.verification_code) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const tokenData = {
        user: {
            id: userValidation?.id,
            email: userValidation?.email,
            picture: userValidation?.profile_picture,
            username: userValidation?.username,
        },
    }

    const token = `Bearer ${await generateJWT(tokenData, config.JWT_EXP_TIME)}`


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
