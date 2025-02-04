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
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
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
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }

  const data = await readRecord("user", userId, customErrorMessages);
  const {errors} = apiResponseHandler(event, customErrorMessages,data);

  if (customErrorMessages.length > 0) {
    throw createError(errors);
  }

  return apiResponse;
});
