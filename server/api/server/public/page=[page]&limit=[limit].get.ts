import prisma from "~/lib/prisma";
import prismaErrorHandler from "~/lib/prisma/databaseErrorHandling";
import readRecords from "~/lib/prisma/databaseOperations/readRecords";
import {errorExpectedFroms, errorReasons, type CustomErrorMessage } from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
    const customErrorMessages: CustomErrorMessage[] = [];
    const apiResponse = {} as ApiResponse;

    const page = Number(event.context.params?.page);
    const limit = Number(event.context.params?.limit);

    apiResponse.context = "Server/GetPublicServers";
    apiResponse.method = "GET";

    event.context.apiResponse = apiResponse;

    if (!event.context.auth) {
        customErrorMessages.push(
          {
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.Unauthorized,
          }
        );
        const {errors} = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);  
      }
      apiResponse.params = {};
      event.context.apiResponse = apiResponse;
      let data;
      try {
        /*
        const servers = await prisma.server.findMany({
          where: {
            visibility: "public",
          },
        });
        apiResponse.data = {
          totalItems: servers.length,
          items: servers,
        };
        */
       data = await readRecords("server", customErrorMessages, {visibility: "public"}, [], limit,page);
      } catch (error) {
        prismaErrorHandler(error,"Server", customErrorMessages);
      }

      if (customErrorMessages.length > 0) {
        const {errors} = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);  
      }

      const {errors} = apiResponseHandler(event, customErrorMessages,{totalItems: data.length,pageIndex: page,itemsPerPage: limit, items: data});
      return apiResponse;
})