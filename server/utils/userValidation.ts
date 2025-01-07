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
 * @param {CustomErrorMessage[]} customErrorMessages - The array of customErrorMessages to be filled with the error message if the hashing fails.
 * @returns {Promise<string>} - A promise that resolves to the hashed password or an empty string.
 */
const hashPassword = async (password: string,customErrorMessages: CustomErrorMessage[]): Promise<string> => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  try {
    const hash = await bcrypt.hash(password, salt);
    await hash.toString();
    return hash;
  } catch (e) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "PasswordHashingFailed"
    }
    customErrorMessages.push(error)
  }
  return "";
};


/**
 * Compares two hashes
 * @param {string} data The string to compare to the hash(not hashed)
 * @param {string} hash The hash
 * @returns {Promise<boolean>}
 */
const compareHashes = async (data: string, hash: string):Promise<boolean> => {
  return await bcrypt.compare(data, hash)
}

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
 * Checks if the user object has all the required parameters.
 * Checks if the password is valid according to the password requirements.
 * Checks if the email is valid according to the email requirements.
 * Checks if the username is valid according to the username requirements.
 * Checks if the first name and last name are valid according to the name requirements.
 *
 * @param {any} event - The event object containing user data to validate, and context for the API response.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any validation failures.
 * @param {boolean} isNewUser - A boolean indicating if the user is being created or not.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the checks passed or not.
 */
const userValidation = async (
  event: any,
  customErrorMessages: CustomErrorMessage[],
): Promise<boolean> => {
  const apiResponse:ApiResponse = event.context.apiResponse;
  const user: User = event.context.apiResponse.params;
  let isValid = true;
  if (paramsCheck(user)) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "MissingParameters"
    };
    customErrorMessages.push(error)
    isValid = false;
  }
  if (user.password && !(await isPasswordValid(user.password))) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "PasswordValidationFailed"
    };
    customErrorMessages.push(error)
    isValid = false;
  }
  if (user.email && !(await isEmailValid(user.email))) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "EmailValidationFailed"
    };
    isValid = false;
    customErrorMessages.push(error)
  }
  if (user.username && !(await isUsernameValid(user.username))) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "UsernameValidationFailed"
    };
    isValid = false;
    customErrorMessages.push(error)
  }
  if (user.first_name && !(await isNameValid(user.first_name))) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "FirstNameValidationFailed"
    };
    isValid = false;
    customErrorMessages.push(error)
  }
  if (user.last_name && !(await isNameValid(user.last_name))) {
    const error:CustomErrorMessage = {
      espectedFrom: "User",
      reason: "LastNameValidationFailed"
    };
    isValid = false;
    customErrorMessages.push(error)
  }
  event.context.apiResponse = apiResponse;
  return isValid;
};

/**
 * Checks if the user object has all the required parameters.
 *
 * @param {User} newUser - The user object to be checked.
 * @returns {boolean} - A boolean indicating if the user object has all the required parameters.
 */
const paramsCheck = (user : User): boolean => {
  if (!Object.values(user).every(value => value !== undefined && value !== null && value !== "")) {
    return true
  } 
  else {
    return false
  }
}


export {
  isEmailValid,
  isPasswordValid,
  compareHashes,
  userValidation,
  hashPassword
};
