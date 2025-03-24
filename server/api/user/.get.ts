import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import { paramsCheck } from "~/shared/utils/userValidation";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/*
 * URL template http://localhost:3000/api/user/?id={userId}
 * A route to get a user data
 */

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "User/Get";
  apiResponse.method = "GET";

  event.context.apiResponse = apiResponse;

  // Check if the user is not logged in
  // If so, throw an error
  if (!event.context.auth) {
    // If not, throw an error
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
  // set the api response in the event context so it can be used in the error handler
  event.context.apiResponse = apiResponse;

  // Check if the parameters are not present
  // If so, throw an error
  if (paramsCheck(apiResponse.params)) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.MissingParameters,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  // Get the user data
  const data = await readRecord("user", userId, customErrorMessages);

  delete data.id;
  delete data.password;

  // if there are custom error messages, throw an error else return the user data
  const { errors } = apiResponseHandler(event, customErrorMessages, {
    totalItems: 1,
    items: [data],
  });

  if (customErrorMessages.length > 0) {
    throw createError(errors);
  }

  return apiResponse;
});
