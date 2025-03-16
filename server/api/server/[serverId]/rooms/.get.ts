import prisma from "~/lib/prisma";
import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import { paramsCheck } from "~/shared/utils/userValidation";
import {
    type CustomErrorMessage,
    errorExpectedFroms,
    errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const customErrorMessages: CustomErrorMessage[] = [];
    const apiResponse = {} as ApiResponse;

    apiResponse.context = "Server/Rooms";
    apiResponse.method = "GET";

    event.context.apiResponse = apiResponse;

    if (!event.context.auth) {
        customErrorMessages.push(
            {
                expectedFrom: errorExpectedFroms.User,
                reason: errorReasons.Unauthorized,
            }
        );
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }

    const userId = event.context.auth.user.id;
    const serverId = getRouterParam(event, "serverId");
    apiResponse.params = {
        userId: userId,
        serverId: serverId
    };
    event.context.apiResponse = apiResponse;

    if (paramsCheck(apiResponse.params)) {
        customErrorMessages.push(
            {
                expectedFrom: errorExpectedFroms.User,
                reason: errorReasons.MissingParameters,
            }
        );
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }

    const dbresponse = await prisma.server.findFirst({
        where: {
            id: serverId,
            Users_connected: {
                some: {
                    user_id: userId
                }
            }
        },
        select: {
            Chat_groups: {
                select: {
                    id: true,
                    name: true,
                    Chat_rooms: {
                        select: {
                            name: true,
                            description: true,
                            type: true,
                        }
                    }
                }
            }
        }
    });
    if (dbresponse === null) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.IdentifierNotFound,
            table: "server",
            target: serverId
        })
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }


    const data = {
        fields: {
            id:
            {
                typename: "string",
                name: "id"
            },
            name:
            {
                typename: "string",
                name: "name"
            },
            Chat_rooms: {
                name: {
                    typename: "string",
                    name: "name"
                },
                description: {
                    typename: "string | null",
                    name: "description"
                },
                type: {
                    name: "type",
                    typename: "$Enums.Chat_Room_Type"
                }
            }
        },
        totalItems: dbresponse.Chat_groups.length,
        items: dbresponse.Chat_groups

    }

    const { errors } = apiResponseHandler(event, customErrorMessages, data);
    if (customErrorMessages.length > 0) {
        throw createError(errors);
    }

    return apiResponse;
});
