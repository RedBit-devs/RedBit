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
  const { errors } = apiResponseHandler(event, customErrorMessages, {totalItems: 1, fields: prisma.server.fields, items: [data]});
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

    const Authorized = await prisma.server.findFirst({
      where: {
        id: serverId,
        OR: [
          { owner_id: userId },
          { Users_connected: { some: { user_id: userId } } },
        ],
      },
    });

    if (Authorized) {
      return apiResponse
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
