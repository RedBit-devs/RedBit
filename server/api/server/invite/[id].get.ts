import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import prismaErrorHandler from "~/lib/prisma/databaseErrorHandling";
import { paramsCheck } from "~/shared/utils/userValidation";
import { type CustomErrorMessage, errorExpectedFroms, errorReasons } from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const inviteId = getRouterParam(event, "id")
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "Server/Invite/";
    apiResponse.method = "GET";
    apiResponse.params = {
        inviteId: inviteId
    }

    event.context.apiResponse = apiResponse;
    const errorMessages:CustomErrorMessage[] = []

    if (!event.context.auth) {
        // 401 == "unauthorized"
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Invite,
            reason: errorReasons.Unauthorized
        })
    }
    
    if (paramsCheck(apiResponse.params)) {
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Invite,
            reason: errorReasons.MissingParameters
        })
    }

    if (errorMessages.length > 0) {
        const {errors} = apiResponseHandler(event, errorMessages);
        throw createError(errors)
    }

    const inviteDbResponse = await prisma.invite.findFirst({
        where: {
            id: inviteId
        }
    })

    if (!inviteDbResponse) {
        //throw createError({ statusCode: 404, statusMessage: "No invite link was found with the given id" })
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.IdentifierNotFound,
            table: "invite",
            target: inviteId
        })

        const {errors} = apiResponseHandler(event, errorMessages);
        throw createError(errors)
    }

    if (inviteDbResponse.created_at.getTime() + inviteDbResponse.lifetime < new Date().getTime()) {
        //throw createError({ statusCode: 400, statusMessage: "Expired" })
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Invite,
            reason: errorReasons.Expired
        })

        const {errors} = apiResponseHandler(event, errorMessages);
        throw createError(errors)
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
        prismaErrorHandler(error, "server_user_connect", errorMessages)
    }

    const data = {
        totalItems: 1,
        fields: prisma.server_User_Connect.fields,
        items: [dbResponse]
    }

    const {errors} = apiResponseHandler(event, errorMessages, data)

    if (errors) throw createError(errors);

    return apiResponse
})