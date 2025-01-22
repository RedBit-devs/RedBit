import type { Invite } from "@prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const reqBody: Invite = await readBody(event);
    const apiResponse = {} as ApiResponseV2;
    apiResponse.context = "Server/Invite/Create";
    apiResponse.method = "PUT";
    apiResponse.params = {
        lifetime: reqBody.lifetime,
        server_id: reqBody.server_id
    }

    if (!event.context.auth) {
        // 401 == "unauthorized"
        throw createError({ statusCode: 401 })
    }
    if (paramsCheck(event)) {
        throw createError({ statusCode: 400, statusMessage: "Not all required parameters where sspecified" })
    }

    const userResponse = await prisma.user.findFirst({
        where: {
            id: event.context.auth.user.id,
            OR: [
                {
                    Servers_joined: {
                        some: {
                            server_id: reqBody.server_id
                        }
                    }
                },
                {
                    Servers_owned: {
                        some: {
                            id: reqBody.server_id
                        }
                    }
                }
            ]
        }
    })

    if (!userResponse) {
        throw createError({ statusCode: 401, statusMessage: "User is not joined to the server specified" })
    }

    const dbResponse = prisma.invite.create({
        data: {
            lifetime: reqBody.lifetime,
            Server: {
                connect: {
                    id: reqBody.server_id
                }
            }
        }
    })

    if (!dbResponse) {
        throw createError({ statusCode: 500, statusMessage: "The database has not provided a response" })
    }

    apiResponse.data = {
        totalItems: 1,
        fields: prisma.invite.fields,
        items: [dbResponse]
    }

    return apiResponse
})