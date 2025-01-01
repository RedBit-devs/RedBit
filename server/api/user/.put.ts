import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import userValidation from "~/server/utils/userValidation";
import {apiResponseHandler} from "~/server/utils/apiResponseHandler";

export default defineEventHandler(async (event) => {
  const newUser: User = await readBody(event);
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "CreateUser";
  apiResponse.method = "PUT";
  apiResponse.params = {
    username: newUser.username,
    email: newUser.email,
    birthdate: newUser.birthdate,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    password: newUser.password,
  };
  const customErrorMessages: CustomErrorMessage[] = [];
  event.context.apiResponse = apiResponse;
  setResponseStatus(event, 400);
  if (!(await userValidation.userValidation(event,customErrorMessages))) {
    apiResponseHandler(event,customErrorMessages);
    return {
      apiResponse,
    };
  }

  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await userValidation.hashPassword(newUser.password,customErrorMessages);
  if (apiResponse.error) {
    return {
      apiResponse,
    };
  }
  await createRecord("user", newUser, apiResponse,customErrorMessages);
  if (customErrorMessages.length > 0) {
    apiResponseHandler(event,customErrorMessages);
  }
  if (!apiResponse.error) {
    setResponseStatus(event, 201);
  }
  return {
    apiResponse,
  };
});
