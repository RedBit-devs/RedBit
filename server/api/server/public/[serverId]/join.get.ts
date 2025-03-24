import { useRoute } from "vue-router";
import prisma from "~/lib/prisma";
import prismaErrorHandler from "~/lib/prisma/databaseErrorHandling";
import readRecords from "~/lib/prisma/databaseOperations/readRecords";
import {
  errorExpectedFroms,
  errorReasons,
  type CustomErrorMessage,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "Server/public/join";
  apiResponse.method = "GET";

  event.context.apiResponse = apiResponse;

  if (!event.context.auth) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.Unauthorized,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  const { serverId } = getRouterParams(event)
  const userId = event.context.auth.user.id
  apiResponse.params = {
    serverId,
    userId
  };
  event.context.apiResponse = apiResponse;

  const dbresponse = await prisma.server.findFirst({
    where: {
      visibility: "public",
      id: `${serverId}`
    },
    select: {
      id: true
    }
  })
  if (!dbresponse) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.NoDatabaseResponse
    })
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  const connectResponse = await prisma.server_User_Connect.create({
    data: {
      server_id: dbresponse.id,
      user_id: userId
    }
  })

  const data = {
    fields: prisma.server_User_Connect.fields,
    totalItems: 1,
    items: [connectResponse]
  }

  apiResponseHandler(event, customErrorMessages, data);
  return apiResponse;
});
