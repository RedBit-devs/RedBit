// server/api/user/shared/servers.ts
import prisma from "~/lib/prisma";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "User/Shared/Servers";
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

  const userId = event.context.auth.user.id;
  const otherUserId = getRouterParams(event).id;

  apiResponse.params = {
    userId: userId,
    otherUserId: otherUserId,
  };
  event.context.apiResponse = apiResponse;

  if (!otherUserId) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.MissingParameters,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  const dbResponse = await prisma.server_User_Connect.findMany({
    include: {
      Server: {
        select: {
          id: true,
          name: true,
          picture: true,
        },
      },
    },
    where: {
      OR: [
        {
          user_id: userId,
          Server: {
            Users_connected: {
              some: {
                user_id: otherUserId,
              },
            },
          },
        },
        {
          user_id: otherUserId,
          Server: {
            Users_connected: {
              some: {
                user_id: userId,
              },
            },
          },
        },
      ],
    },
  });

  const data = {
    totalItems: dbResponse.length - 2,
    items: removeDuplacates(dbResponse),
  };
  apiResponseHandler(event, customErrorMessages, data);
  return apiResponse;
});

function removeDuplacates(data: any[]) {
  const uniqueServers = [];
  for (let i = 0; i < data.length; i += 2) {
    uniqueServers.push(data[i].Server);
  }
  return uniqueServers;
}
