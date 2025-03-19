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

    apiResponse.context = "User/Servers";
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
    apiResponse.params = {
        id: userId,
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

    const dbresponse = await prisma.server_User_Connect.findMany({
        where: {
            user_id: userId
        },
        select: {
            Server: {
                select: {
                    id: true,
                    name: true,
                    picture: true
                }
            }
        }
    });
    if (!dbresponse) {
        return []
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
            picture:
            {
                typename: "string",
                name: "picture"
            }
        },
        totalItems: dbresponse.length,
        items: dbresponse.map(m => m.Server)
    }

    const { errors } = apiResponseHandler(event, customErrorMessages, data);
    if (customErrorMessages.length > 0) {
        throw createError(errors);
    }

    return apiResponse;
});
