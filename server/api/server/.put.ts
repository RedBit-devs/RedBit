import { type Server } from "@prisma/client";
import { log } from "console";
import prisma from "~/lib/prisma";
import prismaErrorHandler from "~/lib/prisma/databaseErrorHandling";
import { paramsCheck } from "~/shared/utils/userValidation";
import {  errorExpectedFroms, errorReasons, type CustomErrorMessage } from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {

    const reqBody: Server = await readBody(event);
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "Server/Create";
    apiResponse.method = "PUT";

    if(!reqBody.picture)
    {
        reqBody.picture = "https://preview.redd.it/ot08x5mn9xk71.png?auto=webp&s=55dc457d26c3b79c805fd4068f98987fffec111d"
    }
    if(!reqBody.description)
    {
        reqBody.description = "The description of the server"
    }

    apiResponse.params = {
        name: reqBody.name,
        picture: reqBody.picture,
        visibility: reqBody.visibility,
        description: reqBody.description
    }
    console.log(apiResponse.params);
    
    event.context.apiResponse = apiResponse;
    let errorMessages: CustomErrorMessage[] = []


    if (!event.context.auth) {

        errorMessages.push({
            expectedFrom: errorExpectedFroms.Server,
            reason: errorReasons.Unauthorized
        })
    }

     if (paramsCheck(apiResponse.params)) {
             errorMessages.push({
                 expectedFrom: errorExpectedFroms.Server,
                 reason: errorReasons.MissingParameters
             })
         }

    if (errorMessages.length > 0) {
        const {errors} = apiResponseHandler(event, errorMessages);
        throw createError(errors)
    }
    let dbResponse
    try {
        dbResponse = await prisma.server.create({
            data: {
                name: reqBody.name,
                picture: reqBody.picture,
                visibility: reqBody.visibility,
                description: reqBody.description,
                Owner: {
                    connect: {
                        id: event.context.auth.user.id
                    }
                },
                Chat_groups: {
                    create: {
                        name: "default",
                        Chat_rooms: {
                            create: {
                                name: "default",
                                type: "text"
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        prismaErrorHandler(error,"server",errorMessages);
    }

    if (!dbResponse) {
        errorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.NoDatabaseResponse
        })
    }

    const meow = {
        totalItems: 1,
        fields: prisma.server.fields,
        items: [dbResponse]
    }

    const { errors } = apiResponseHandler(event, errorMessages, meow)
    if (errors) {
        throw createError(errors)
    }

    return event.context.apiResponse
    //https://fr.memedroid.com/memes/detail/4380202/Uno?refGallery=tags&page=1&tag=star+wars
})