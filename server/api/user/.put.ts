import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import userValidation from "~/server/utils/userValidation";

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
  setResponseStatus(event, 400);
  if (!(await userValidation.userValidation(newUser, apiResponse))) {
    return {
      apiResponse,
    };
  }

  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await userValidation.hashPassword(newUser.password,apiResponse);
  if (apiResponse.error) {
    return {
      apiResponse,
    };
  }
  await createRecord("user", newUser, apiResponse);
  if (!apiResponse.error) {
    setResponseStatus(event, 201);
  }
  return {
    apiResponse,
  };
});
