import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createRecord from "~/lib/databaseOperations/createRecord";

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

  if (!(await isPasswordValid(newUser.password))) {
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
  if (!(await isEmailValid(newUser.email))) {
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
  if (!(await isUsernameValid(newUser.username))) {
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
  if (!(await isNameValid(newUser.first_name))) {
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
  if (!(await isNameValid(newUser.last_name))) {
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
  newUser.password = await hashPassword(newUser.password);
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

/**
 * Hashes the given password using bcrypt algorithm.
 *
 * This function generates a salt with a predefined number of rounds
 * and uses it to hash the provided password. The resulting hash is returned.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  try {
    const hash = await bcrypt.hash(password, salt);
    await hash.toString();
    return hash;
  } catch (e) {
    throw e;
  }
};

/**
 * Validates the given password.
 *
 * The password must meet the following criteria:
 * - Contains at least 8 characters
 * - Includes at least one uppercase letter
 * - Includes at least one lowercase letter
 * - Includes at least one digit
 * - Includes at least one special character (e.g., @$!%*#?&)
 *
 * @param {string} password - The password to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the password is valid.
 */
const isPasswordValid = async (password: string): Promise<boolean> => {
  const validPasswordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const validPasswordCheck = validPasswordPattern.test(password);
  return validPasswordCheck;
};

/**
 * Validates the given email address.
 *
 * The email must match the following pattern:
 * - Must contain alphanumeric characters, dots, underscores, pluses, or hyphens before the '@' symbol.
 * - Must contain a domain name with alphanumeric characters and dots after the '@' symbol.
 * - Must have a top-level domain of at least two alphabetical characters.
 *
 * @param {string} email - The email address to be validated.
 * @returns {Promise<boolean>} - A promise resolving to a boolean indicating if the email is valid.
 */
const isEmailValid = async (email: string): Promise<boolean> => {
  const validEmailPattern: RegExp =
    /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmailCheck = validEmailPattern.test(email);
  return validEmailCheck;
};

/**
 * Validates the given username.
 *
 * The username must match the following requirements:
 * - At least 3 characters long
 * - At most 32 characters long
 * - Contains only letters (both uppercase and lowercase), numbers, and underscore
 *
 * @param {string} username - The username to be validated.
 * @returns {Promise<boolean>} - A promise resolving to a boolean indicating if the username is valid.
 */
const isUsernameValid = async (username: string): Promise<boolean> => {
  const validUsernamePattern: RegExp = /^[a-zA-Z0-9_]{3,32}/;
  const validUsernameCheck = validUsernamePattern.test(username);
  return validUsernameCheck;
};
/**
 * Validates the given name.
 *
 * The name must match the following requirements:
 * - At least 3 characters long
 * - At most 35 characters long
 * - Contains only letters (both uppercase and lowercase)
 *
 * @param {string} name - The name to be validated.
 * @returns {Promise<boolean>} - A promise resolving to a boolean indicating if the name is valid.
 */
const isNameValid = async (name: string): Promise<boolean> => {
  const validNamePattern: RegExp = /^[a-zA-Z]{3,35}/;
  const validNameCheck = validNamePattern.test(name);
  return validNameCheck;
};
