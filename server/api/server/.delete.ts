import prisma from "~/lib/prisma";
import deleteRecord from "~/lib/prisma/databaseOperations/deleteRecord";
import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import {errorExpectedFroms, errorReasons, type CustomErrorMessage } from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "api/server";
  apiResponse.method = "DELETE";

  event.context.apiResponse = apiResponse;
  if (!event.context.auth) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.Unauthorized,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  const userId = event.context.auth.user.id;
  console.log(userId);
  
  const {serverId,authorId} = await readBody(event);
  console.log(serverId)
  if(!serverId)
  {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Server,
      reason: errorReasons.MissingParameters,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  apiResponse.params = {
    severId : serverId,
  }

  const server = readRecord("server",serverId,customErrorMessages,["author_id"]);
  console.log(server);

  await deleteRecord("server", serverId, customErrorMessages);
  await prisma.server_User_Connect.deleteMany({
    where: {
      user_id: userId,
    },
  })

  if (customErrorMessages.length > 0) {
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  await apiResponseHandler(event,customErrorMessages,{deleted:true, totalItems:0,items:[]});
})
