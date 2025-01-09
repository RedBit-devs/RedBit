//URL template
//http://localhost:3000/api/user/verifyEmail?id={userId}&email={email}

import prisma from "~/lib/prisma";
import { paramsCheck } from "~/server/utils/userValidation";

export default defineEventHandler(async (event) => {

    let { id, email }: { id: string, email: string } = getQuery(event)

    const apiResponse = {} as ApiResponse;
    apiResponse.context = "user/verifyEmail";
    apiResponse.method = "GET";
    apiResponse.params = {
        id: id,
        email: email
    };

    const errorMessages: CustomErrorMessage[] = []
    event.context.customErrorMessages = errorMessages;
    event.context.apiResponse = apiResponse;

    if (paramsCheck(apiResponse.params)) {
        errorMessages.push({
            espectedFrom: "User",
            reason: "MissingParameters"
        })

        apiResponseHandler(event, errorMessages)
        if (apiResponse.error) {
            return apiResponse
        }
    }


    const findEmailResponse = await prisma.user.findFirst({
        where: { id },
        select: {
            email: true
        }
    })

    if (!findEmailResponse) {
        errorMessages.push({
            espectedFrom: "Prisma",
            reason: "IdentifierNotFound",
            table: "User",
            target: id
        })
    }

    if (findEmailResponse && findEmailResponse.email != email) {
        errorMessages.push({
            espectedFrom: "User",
            reason: "DataDontMatch"
        })
    }

    apiResponseHandler(event, errorMessages)
    if (apiResponse.error) {
        return apiResponse
    }

    const response = await prisma.user.update({
        where: { id },
        data: {
            email_verified: true
        },
        select: {
            email_verified: true
        }
    })

    apiResponseHandler(event, errorMessages, {
        totalItems: 1,
        items: [response]
    })

    return apiResponse
    // Hello there
    //https://pm1.aminoapps.com/6525/10c214eab1fbae69c7b0d49df0aa4fd715e1a36d_hq.jpg
})