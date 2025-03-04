import type { Invite } from "@prisma/client";
import prisma from "~/lib/prisma";
import { paramsCheck } from "~/shared/utils/userValidation";
import { type CustomErrorMessage, errorExpectedFroms, errorReasons } from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const reqBody: Invite = await readBody(event);
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "Server/Invite/Create";
    apiResponse.method = "PUT";
    apiResponse.params = {
        lifetime: reqBody.lifetime,
        server_id: reqBody.server_id
    }

    event.context.apiResponse = apiResponse;
    const errorMessages: CustomErrorMessage[] = []

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
        const { errors } = apiResponseHandler(event, errorMessages);
        throw createError(errors)
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
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.NoDatabaseResponse
        })

        const { errors } = apiResponseHandler(event, errorMessages);
        throw createError(errors)
    }

    const dbResponse = await prisma.invite.create({
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
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.NoDatabaseResponse
        })
    }

    const data = {
        totalItems: 1,
        fields: prisma.invite.fields,
        items: [dbResponse]
    }

    console.log("contition");


    const { errors } = apiResponseHandler(event, errorMessages, data)

    if (errors) throw createError(errors);

    return event.context.apiResponse;
})