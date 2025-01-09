import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import { paramsCheck } from "~/server/utils/userValidation";

export default defineEventHandler(async (event) => {
  if(!event.context.auth)
  {
    console.log("here")
  }
  const userId = event.context.auth.user.id
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "User/Get";
  apiResponse.method = "GET";
  apiResponse.params = {
    id: userId,
  };
  console.log(userId);
  const customErrorMessages: CustomErrorMessage[] = [];
  event.context.apiResponse = apiResponse;
  if (paramsCheck(apiResponse.params)) {
    const error: CustomErrorMessage = {
      expectedFrom: "User",
      reason: "MissingParameters",
    }
    customErrorMessages.push(error);
    apiResponseHandler(event, customErrorMessages);
    return apiResponse;
  }
  const data = await readRecord("user", userId, customErrorMessages);
  apiResponseHandler(event, customErrorMessages,data);
  return apiResponse
});
