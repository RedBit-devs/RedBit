import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const inviteId = getRouterParam(event, "id")
    const apiResponse = {} as ApiResponseV2;
    apiResponse.context = "Server/Invite/";
    apiResponse.method = "GET";
    apiResponse.params = {
        inviteId: inviteId
    }

    if (!event.context.auth) {
        // 401 == "unauthorized"
        throw createError({ statusCode: 401 })
    }
    if (paramsCheck(apiResponse.params)) {
        throw createError({ statusCode: 400, statusMessage: "Not all required parameters where sspecified" })
    }

    const inviteDbResponse = await prisma.invite.findFirst({
        where: {
            id: inviteId
        }
    })

    if (!inviteDbResponse) {
        throw createError({ statusCode: 404, statusMessage: "No invite link was found with the given id" })
    }

    if (inviteDbResponse.created_at.getTime() + inviteDbResponse.lifetime < new Date().getTime()) {
        throw createError({ statusCode: 400, statusMessage: "Invite link expired" })
    }


    let dbResponse;
    //TODO When migrating to the new API handler this should be changed to the createRecord function
    try {
        dbResponse = await prisma.server_User_Connect.create({
            data: {
                server_id: inviteDbResponse.server_id,
                user_id: event.context.auth.user.id
            }
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            
            if (error.code === "P2002") {
                throw createError({statusCode: 500, statusMessage: "unique constrait failed"})
        }
            
        }
    }
    apiResponse.data = {
        totalItems: 1,
        fields: prisma.server_User_Connect.fields,
        items: [dbResponse]
    }

    return apiResponse
})