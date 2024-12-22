import createRecord from "~/lib/databaseOperations/createRecord";
import userValidation from "~/lib/utils/userValidation";


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

  if (!(await userValidation.isPasswordValid(newUser.password))) {
    setResponseStatus(event, 400);
    apiResponse.error = {
      code: "400",
      message:
        "Password is not valid it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      errors: [
        {
          domain: "users",
          reason: "PasswordValidationFailed",
          message: "The provided password is not valid",
        },
      ],
    };
    return {
      apiResponse,
    };
  }
  if (!(await userValidation.isEmailValid(newUser.email))) {
    setResponseStatus(event, 400);
    apiResponse.error = {
      code: "400",
      message: "Email is not in the correct format",
      errors: [
        {
          domain: "users",
          reason: "EmailValidationFailed",
          message: "The provided email is not valid",
        },
      ],
    };
    return {
      apiResponse,
    };
  }
  if (!(await userValidation.isUsernameValid(newUser.username))) {
    setResponseStatus(event, 400);
    apiResponse.error = {
      code: "400",
      message:
        "Username is not in the correct format it must be between 3 and 32 characters long and can only contain letters, numbers and underscores",
      errors: [
        {
          domain: "users",
          reason: "usernameValidationFailed",
          message: "The provided username is not valid",
        },
      ],
    };
    return {
      apiResponse,
    };
  }
  if (!(await userValidation.isNameValid(newUser.first_name))) {
    setResponseStatus(event, 400);
    apiResponse.error = {
      code: "400",
      message:
        "First name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
      errors: [
        {
          domain: "users",
          reason: "NameValidationFailed",
          message: "The provided first name is not valid",
        },
      ],
    };
    return {
      apiResponse,
    };
  }
  if (!(await userValidation.isNameValid(newUser.last_name))) {
    setResponseStatus(event, 400);
    apiResponse.error = {
      code: "400",
      message:
        "Last name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
      errors: [
        {
          domain: "users",
          reason: "NameValidationFailed",
          message: "The provided last name is not valid",
        },
      ],
    };
    return {
      apiResponse,
    };
  }
  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await userValidation.hashPassword(newUser.password);
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

