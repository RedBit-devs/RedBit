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
    if (paramsCheck(event)) {
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

    if (inviteDbResponse.created_at.getTime() + inviteDbResponse.lifetime > new Date().getTime()) {
        throw createError({ statusCode: 400, statusMessage: "Invite link expired" })
    }

    const dbResponse = await prisma.server_User_Connect.create({
        data: {
            server_id: inviteDbResponse.server_id,
            user_id: event.context.auth.user.id
        }
    })

    apiResponse.data = {
        totalItems: 1,
        fields: prisma.server_User_Connect.fields,
        items: [dbResponse]
    }

    return apiResponse
})