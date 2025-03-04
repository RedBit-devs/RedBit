export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
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