import type { Server } from "@prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {

    const reqBody: Server = await readBody(event);
    const apiResponse = {} as ApiResponseV2;
    apiResponse.context = "Server/Create";
    apiResponse.method = "PUT";
    apiResponse.params = {
        name: reqBody.name,
        picture: reqBody.picture,
        visibility: reqBody.visibility
    }

    if (!event.context.auth) {

        // 401 == "unauthorized"
        throw createError({statusCode: 401})
    }

    if (paramsCheck(apiResponse.params)) {
        throw createError({statusCode: 400, statusMessage:"Not all required parameters where sspecified"})
    }


    const dbResponse = await prisma.server.create({
        data:{
            name: reqBody.name,
            picture: reqBody.picture,
            visibility: reqBody.visibility,
            Owner: {
                connect:{
                    id: event.context.auth.user.id
                }
            },
            Chat_groups: {
                create: {
                    name: "default",
                    Chat_rooms:{
                        create: {
                            name: "default",
                            type: "text"
                        }
                    }
                }
            }
        }
    })

if (!dbResponse) {
    throw createError({statusCode: 500, statusMessage: "The database has not provided a response"})
}

    apiResponse.data = {
        totalItems: 1,
        fields: prisma.server.fields,
        items: [dbResponse]
    }


    return apiResponse
})