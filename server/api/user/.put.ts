import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import { apiResponseHandler } from "~/server/utils/apiResponseHandler";
import { userValidation, hashPassword } from "~/shared/utils/userValidation";
import { type CustomErrorMessage } from "~/types/customErrorMessage";

/*
 * URL template http://localhost:3000/api/user
 * A route to create a user in the database
 */

export default defineEventHandler(async (event) => {
  const newUser: User = await readBody(event);
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "User/Create";
  apiResponse.method = "PUT";
  const params: User = {
    username: newUser.username,
    email: newUser.email,
    birthdate: newUser.birthdate,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    password: newUser.password,
    profile_picture: newUser.profile_picture,
  };
  apiResponse.params = params;
  const customErrorMessages: CustomErrorMessage[] = [];

  // set the api response in the event context so it can be used in the error handler
  event.context.apiResponse = apiResponse;

  // Validate the user creation data
  // If the data is not valid, throw an error
  if (!(await userValidation(apiResponse, customErrorMessages))) {
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await hashPassword(newUser.password, customErrorMessages);
  params.password = "SuperSecretPassword";
  apiResponse.params = params;

  // if the customErrorMessages array is not empty
  // throw an error
  if (customErrorMessages.length > 0) {
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  // Create the user
  const data = await createRecord("user", newUser, customErrorMessages);
  const dataWithoutPassword = { ...data, password: "SuperSecretPassword" };

  // if there are custom error messages, throw an error else return the created user data
  const { errors } = apiResponseHandler(
    event,
    customErrorMessages,
    dataWithoutPassword
  );

  if (customErrorMessages.length > 0) {
    throw createError(errors);
  }
  return apiResponse;
});
