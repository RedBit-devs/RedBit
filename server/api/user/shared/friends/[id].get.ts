import prisma from "~/lib/prisma";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "User/Shared/Friends";
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

  //Get all connections
  const allConnections = await prisma.friend_Connect.findMany({
    where: {
      OR: [
        {
          OR: [{ user1_id: userId }, { user2_id: userId }],
        },
        {
          OR: [{ user1_id: otherUserId }, { user2_id: otherUserId }],
        },
      ],
      befriended_at: { not: null },
    },
    include: {
      User1: {
        select: {
          id: true,
          username: true,
          profile_picture: true,
        },
      },
      User2: {
        select: {
          id: true,
          username: true,
          profile_picture: true,
        },
      },
    },
  });

  //Filter connections to get friends.
  const userConnections = allConnections.filter(
    (conn) => conn.user1_id === userId || conn.user2_id === userId
  );

  const otherUserConnections = allConnections.filter(
    (conn) => conn.user1_id === otherUserId || conn.user2_id === otherUserId
  );

  //Extract users friends data
  const userFriends = userConnections.map((connection) => {
    if (connection.user1_id === userId) {
      return connection.User2;
    } else {
      return connection.User1;
    }
  });

  const otherUserFriends = otherUserConnections.map((connection) => {
    if (connection.user1_id === otherUserId) {
      return connection.User2;
    } else {
      return connection.User1;
    }
  });

  //Find common friends
  const commonFriends: any[] = [];
  for (const userFriend of userFriends) {
    for (const otherUserFriend of otherUserFriends) {
      if (userFriend.id === otherUserFriend.id) {
        commonFriends.push(userFriend);
        break;
      }
    }
  }
  const data = {
    totalItems: commonFriends.length,
    items: commonFriends,
  };
  apiResponseHandler(event, customErrorMessages, data);
  return apiResponse;
});
