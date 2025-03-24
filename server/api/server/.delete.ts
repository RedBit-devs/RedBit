import prisma from "~/lib/prisma";
import deleteRecord from "~/lib/prisma/databaseOperations/deleteRecord";
import { errorExpectedFroms, errorReasons, type CustomErrorMessage } from "~/types/customErrorMessage";

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
  const { serverId } = await readBody(event);

  if (!serverId) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Server,
      reason: errorReasons.MissingParameters,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  apiResponse.params = {
    severId: serverId,
  }
  const server = await prisma.server.findFirst({
    where: {
      id: serverId,
      owner_id: userId,
    }
  })

  if (!server) {
    customErrorMessages.push(
      {
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.NoDatabaseResponse
      }
    )
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  await deleteRecord("server", serverId, customErrorMessages);

  if (customErrorMessages.length > 0) {
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  await apiResponseHandler(event, customErrorMessages, { deleted: true, totalItems: 0, items: [] });

  return apiResponse
})
