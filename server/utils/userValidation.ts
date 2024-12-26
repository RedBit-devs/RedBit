import bcrypt from "bcrypt";

const EMAIL_PATTERN: RegExp = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const USERNAME_PATTERN: RegExp = /^[a-zA-Z0-9_]{3,32}/
const NAME_PATTERN: RegExp = /^[a-zA-Z]{3,35}/

/**
 * Hashes the given password using bcrypt algorithm.
 *
 * This function generates a salt with a predefined number of rounds
 * and uses it to hash the provided password. The resulting hash is returned.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const hashPassword = async (password: string,apiResponse: ApiResponse): Promise<string> => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  try {
    const hash = await bcrypt.hash(password, salt);
    await hash.toString();
    return hash;
  } catch (e) {
    apiResponse.error = {
      code: "PasswordHashingFailed",
      message: "Password hashing failed",
      errors: [
        {
          domain: "users",
          reason: "PasswordHashingFailed",
          message: "Password hashing failed",
        },
      ],
    }
  }
  return "";
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
  const validPasswordCheck = PASSWORD_PATTERN.test(password);
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
  const validEmailCheck = EMAIL_PATTERN.test(email);
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
  const validUsernameCheck = USERNAME_PATTERN.test(username);
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
  const validNameCheck = NAME_PATTERN.test(name);
  return validNameCheck;
};

/**
 * Validates a user data for creation.
 *
 * Checks if the password is valid according to the password requirements.
 * Checks if the email is valid according to the email requirements.
 * Checks if the username is valid according to the username requirements.
 * Checks if the first name and last name are valid according to the name requirements.
 *
 * If any of the checks fail, an ApiResponse object is populated with an error message and the reason for the failure.
 *
 * @param {User} newUser - The user to be validated.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the error message if any of the checks fail.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the checks passed or not.
 */
const userValidation = async (
  newUser: User,
  apiResponse: ApiResponse
): Promise<boolean> => {
  (apiResponse as ApiResponse).error = {
    code: "",
    message: "",
    errors: [],
  };

  let isValid = true;
  if (!(await isPasswordValid(newUser.password))) {
    isValid = false;
    apiResponse.error?.errors?.push({
      domain: "users",
      reason: "PasswordValidationFailed",
      message:
        "Password is not valid it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    });
  }
  if (!(await isEmailValid(newUser.email))) {
    isValid = false;
    apiResponse.error?.errors?.push({
      domain: "users",
      reason: "EmailValidationFailed",
      message: "The provided email is not valid",
    });
  }
  if (!(await isUsernameValid(newUser.username))) {
    isValid = false;
    apiResponse.error?.errors?.push({
      domain: "users",
      reason: "usernameValidationFailed",
      message:
        "Username is not in the correct format it must be between 3 and 32 characters long and can only contain letters, numbers and underscores",
    });
  }
  if (!(await isNameValid(newUser.first_name))) {
    isValid = false;
    apiResponse.error?.errors?.push({
      domain: "users",
      reason: "NameValidationFailed",
      message:
        "First name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
    });
  }
  if (!(await isNameValid(newUser.last_name))) {
    isValid = false;
    apiResponse.error?.errors?.push({
      domain: "users",
      reason: "NameValidationFailed",
      message:
        "Last name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
    });
  }
  if (!isValid && apiResponse.error) {
    apiResponse.error.code = "400";
    apiResponse.error.message = "User Validation failed";
  }
  else {
    delete apiResponse.error;
  }
  return isValid;
};

export default {
  userValidation,
  hashPassword,
  isEmailValid,
  isUsernameValid
};

export {
  userValidation,
  hashPassword,
  isEmailValid,
  isUsernameValid,
  isPasswordValid
};
