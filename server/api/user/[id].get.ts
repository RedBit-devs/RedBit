import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import { paramsCheck } from "~/server/utils/userValidation";

export default defineEventHandler(async (event) => {
  const userId:string = getRouterParam(event, 'id')?? "";
  console.log(userId);
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
      espectedFrom: "User",
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
