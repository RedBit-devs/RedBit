import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import { paramsCheck } from "~/server/utils/userValidation";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  if (!event.context.auth) {
    const error: CustomErrorMessage = {
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.Unauthorized,
    };
    customErrorMessages.push(error);
  }
  const userId = event.context.auth.user.id;
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "User/Get";
  apiResponse.method = "GET";
  apiResponse.params = {
    id: userId,
  };
  event.context.apiResponse = apiResponse;
  if (paramsCheck(apiResponse.params)) {
    const error: CustomErrorMessage = {
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.MissingParameters,
    };
    customErrorMessages.push(error);
    apiResponseHandler(event, customErrorMessages);
    return apiResponse;
  }
  const data = await readRecord("user", userId, customErrorMessages);
  apiResponseHandler(event, customErrorMessages, data);
  return apiResponse;
});
