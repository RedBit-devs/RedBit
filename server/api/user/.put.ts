import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import {apiResponseHandler} from "~/server/utils/apiResponseHandler";
import {userValidation,hashPassword} from "~/server/utils/userValidation";

export default defineEventHandler(async (event) => {
  const newUser: User = await readBody(event);
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "User/Create";
  apiResponse.method = "PUT";

  
  apiResponse.params = {
    username: newUser.username,
    email: newUser.email,
    birthdate: newUser.birthdate,
    firstName: newUser.first_name,
    lastName: newUser.last_name,
    password: newUser.password,
  };
  const customErrorMessages: CustomErrorMessage[] = [];
  event.context.customErrorMessages = customErrorMessages;
  event.context.apiResponse = apiResponse;
  if (!(await userValidation(event,customErrorMessages))) {
    apiResponseHandler(event,customErrorMessages);
    return apiResponse
  }

  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await hashPassword(newUser.password,customErrorMessages);
  if (customErrorMessages.length > 0) {
    apiResponseHandler(event,customErrorMessages);
    return apiResponse
  }
  const data = await createRecord("user", newUser,customErrorMessages);
  
  apiResponseHandler(event,customErrorMessages,data);
  return apiResponse
});
