import prisma from "~/lib/prisma";
import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import { apiResponseHandler } from "~/server/utils/apiResponseHandler";
import { userValidation, hashPassword, paramsCheck } from "~/shared/utils/userValidation";
import {
    errorExpectedFroms,
    errorReasons,
    type CustomErrorMessage,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "Server/Chatgroup/Create";
    apiResponse.method = "PUT";

    const customErrorMessages: CustomErrorMessage[] = [];
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
    const reqBody = await readBody(event);

    apiResponse.params = {
        serverId: serverId,
        userId: userId,
        name: reqBody.name
    };

    event.context.apiResponse = apiResponse;


    if (paramsCheck(apiResponse.params)) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.Server,
            reason: errorReasons.MissingParameters
        })
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }


    const userdbresponse = await prisma.server_User_Connect.findFirst({
        where:{
            user_id: userId,
            server_id: serverId
        }
    })
    if (!userdbresponse) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.ServerAccessDenied
        })
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }

    const dbResponse = await prisma.chat_Group.create({
        data: {
            name: reqBody.name,
            Server: {
                connect: {
                    id: serverId
                }
            }

        }
    })

    if (!dbResponse) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.NoDatabaseResponse
        })
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }



    const data = {
        fields: prisma.chat_Group.fields,
        totalItems: 1,
        items: [
            dbResponse
        ]
    }

    const { errors } = apiResponseHandler(event, customErrorMessages, data);

    if (customErrorMessages.length > 0) {
        throw createError(errors);
    }
    return apiResponse

});
