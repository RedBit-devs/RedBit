import prisma from "~/lib/prisma";
import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "Server/Get";
  apiResponse.method = "GET";
  event.context.apiResponse = apiResponse;

  if (!event.context.auth) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Server,
      reason: errorReasons.Unauthorized,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  let serverId = getRouterParam(event, "id");
  const userId = event.context.auth.user.id;
  if (!serverId) {
    serverId = "";
  }
  apiResponse.params = {
    serverId: serverId,
    userId: userId,
  };
  event.context.apiResponse = apiResponse;

  if (paramsCheck(apiResponse.params)) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Server,
      reason: errorReasons.MissingParameters,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  const data = await readRecord("server", serverId, customErrorMessages);
  const { errors } = apiResponseHandler(event, customErrorMessages, data);
  if (customErrorMessages.length > 0) {
    throw createError(errors);
  }

  if (!data) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.NoDatabaseResponse,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  if (data.visibility === "private") {
    const owner = await prisma.server.findFirst({
      where: {
        id: serverId,
        owner_id: userId,
      },
    });
    if (owner) {
      return apiResponse;
    }

    const member = await prisma.server_User_Connect.findFirst({
      where: {
        server_id: serverId,
        user_id: userId,
      },
    });
    if (member) {
      return apiResponse;
    }

    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Server,
      reason: errorReasons.ServerAccessDenied,
    });

    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  return apiResponse;
});
