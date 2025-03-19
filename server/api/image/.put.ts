import prisma from "~/lib/prisma";
import { apiResponseHandler } from "~/server/utils/apiResponseHandler";
import {  paramsCheck } from "~/shared/utils/userValidation";
import {
    errorExpectedFroms,
    errorReasons,
    type CustomErrorMessage,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "Image/Create";
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
    const reqBody = await readBody(event);

    apiResponse.params = {
        userId: userId,
        name: reqBody.name,
        content: reqBody.content
    };

    event.context.apiResponse = apiResponse;


    if (paramsCheck(apiResponse.params)) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.Image,
            reason: errorReasons.MissingParameters
        })
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }



    const dbResponse = await prisma.images.create({
        data: {
            name: reqBody.name,
            content: reqBody.content,
            Author:{
                connect:{
                    id: userId
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
        fields: prisma.images.fields,
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
