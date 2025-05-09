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

  apiResponse.context = "User/Get";
  apiResponse.method = "GET";

  event.context.apiResponse = apiResponse;

  if (!event.context.auth) {
    customErrorMessages.push(
      {
        expectedFrom: errorExpectedFroms.User,
        reason: errorReasons.Unauthorized,
      }
    );
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }

  const userId = event.context.auth.user.id;
  apiResponse.params = {
    id: userId,
  };
  event.context.apiResponse = apiResponse;

  if (paramsCheck(apiResponse.params)) {
    customErrorMessages.push(
      {
        expectedFrom: errorExpectedFroms.User,
        reason: errorReasons.MissingParameters,
      }
    );
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }

  const data: User = await readRecord("user", userId, customErrorMessages);
  data.password = "NiceTryLol";
  const {errors} = apiResponseHandler(event, customErrorMessages, {totalItems: 1, items: [data]});

  if (customErrorMessages.length > 0) {
    throw createError(errors);
  }

  return apiResponse;
});
