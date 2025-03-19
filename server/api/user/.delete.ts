import prisma from "~/lib/prisma";
import prismaErrorHandler from "~/lib/prisma/databaseErrorHandling";
import deleteRecord from "~/lib/prisma/databaseOperations/deleteRecord";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "User/Delete";
  apiResponse.method = "Delete";

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
  apiResponse.params = {
    id: userId,
  };

  let valueChanges = 0;
  try {
    const updatedData = await prisma.$transaction([
      prisma.message.updateMany({
        where: {
          user_id: userId,
        },
        data: {
          user_id: "deleteduser",
        },
      }),
      prisma.friend_Connect.deleteMany({
        where: {
          OR: [
            {
              user1_id: userId,
            },
            {
              user2_id: userId,
            },
          ],
        },
      }),
      prisma.server_User_Connect.deleteMany({
        where: {
          user_id: userId,
        },
      }),
      prisma.ban.deleteMany({
        where: {
          sufferer_id: userId,
        },
      }),
    ]);
    valueChanges += updatedData.length;
    const servers = await prisma.server.findMany({
      where: {
        owner_id: userId,
      },
    });
    for (const server of servers) {
      const serverId = server.id;
      const oldestUser = await prisma.server_User_Connect.findFirst({
        where: {
          server_id: serverId,
        },
        orderBy: {
          created_at: "asc",
        },
      });
      if (oldestUser) {
       const updated = await prisma.server.update({
          where: {
            id: serverId,
          },
          data: {
            owner_id: oldestUser.user_id,
          },
        });
      } else {
        await deleteRecord("server", serverId, customErrorMessages);
      }
      valueChanges += 1;
    }
  } catch (error) {
    prismaErrorHandler(error, "message", customErrorMessages, userId);
  }
  let responseData;
  if (valueChanges > 0) {
    responseData = {
      deleted: true,
      totalItems: 2,
      items:[{
          changedValue: valueChanges
        }
      ]
    }
  }
  if (customErrorMessages.length > 0) {
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  const { errors } = apiResponseHandler(
    event,
    customErrorMessages,
    responseData
  );

  if (customErrorMessages.length > 0) {
    throw createError(errors);
  }
  return apiResponse;
});
