import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import ValidateUser from "~/lib/utils/userValidation";


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

  if((await ValidateUser.userValidation(newUser,apiResponse)))
  {
    setResponseStatus(event, 400);
    return {
      apiResponse,
    };
  }
  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await ValidateUser.hashPassword(newUser.password);
  await createRecord("user", newUser, apiResponse);
  if (apiResponse.error) {
    setResponseStatus(event, 400);
  } else {
    setResponseStatus(event, 201);
  }
  return {
    apiResponse,
  };
});

