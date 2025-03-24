import {
  type CustomErrorMessage,
  type customThrowError,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

const generalErrorReasonAndMessages = {
  MissingParameters: "Some required parameters were missing",
  Unauthorized: "Authentication required you are not logged in",
  Expired: "Expired",
};

const userErrorReasonAndMessages = {
  PasswordValidationFailed:
    "Password is not valid it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  EmailValidationFailed: "Email is not valid",
  UsernameValidationFailed:
    "Username is not in the correct format it must be between 3 and 32 characters long and can only contain letters, numbers and underscores",
  FirstNameValidationFailed:
    "First name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
  LastNameValidationFailed:
    "Last name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
  PasswordHashingFailed: "Some error occurred while hashing the password",
  EmailDoesntMatch: "Provided email does not match expected email",
  FailedToLogin: "Failed to login password is not correct",
  ...generalErrorReasonAndMessages,
};
const serverErrorReasonAndMessages = {
  ServerAccessDenied:
    "The server content is not available for the current user",
  ...generalErrorReasonAndMessages,
};
const inviteErrorReasonAndMessages = {
  ...generalErrorReasonAndMessages,
  Expired: "Invite link expired",
};
const imageErrorReasonAndMessages = {
  ...generalErrorReasonAndMessages,
};

const prismaErrorReasonAndMessages = {
  TableNotFound: "Can't read from the {table} table because it doesn't exist",
  UniqueConstraintFailed:
    "The unique constraint failed on the {table} table with the following values: {target}",
  IdentifierNotFound:
    "Oparation failed on {table} table because the record with  id: {target} doesn't exist",
  ValidationError: "Something was not in the correct format",
  UnknownError: "An unknown error occurred",
  NoDatabaseResponse: "Database did not provide a response",
};

const devErrorReasonAndMessages = {
  BadCustomErrorReason:
    "The given custom error reason is not in the expected custom error object",
  BadCustomErrorExpectedFrom:
    "The given custom error expected from is not in the api response handler",
};
const errorHttpStatusCodes = {
  452: "UserValidationFailed",
  453: "PrismaResponseFailed",
  454: "BadCustomErrorReason",
  455: "BadCustomErrorExpectedFrom",
  456: "ErrorsOcuredOnServerRoute",
  457: "ErrorsOcuredOnImageRoute",
};

/**
 * Handles custom error messages and returns an errors object .
 *
 * If there are no custom error messages, it sets the data property of the api response object to the given data or a default value.
 *
 * If there are custom error messages, it will return a customThrowError object containing the errors and the status code and status message.
 *
 * The status code and status message are determined by the expectedFrom property of the custom error messages.
 *
 * If the expectedFrom property is not one of the expected values, it sets the status code to 455 and the status message to "BadCustomErrorExpectedFrom"
 *
 * If the reason property of the custom error message is not in the expected custom error object it sets the status code to 454 and the status message to "BadCustomErrorReason".
 *
 * if the reason property of the custom error message is in the expected custom error object, it sets the status code to the corresponding http status code and the status message to the corresponding http status message and adds the custom error message to the errors array with the corresponding data.
 *
 * @param {any} event - The event object of the route.
 * @param {CustomErrorMessage[]} customErrorMessages - The custom error messages to be handled.
 * @param {ResponseData} data - The data to be returned if there are no custom error messages.
 * @returns {any} An object containing the errors property which is a customThrowError object or an empty object if there are no custom error messages.
 */
const apiResponseHandler = (
  event: any,
  customErrorMessages: CustomErrorMessage[],
  data?: ResponseData
): any => {
  const apiResponse = event.context.apiResponse;
  // initialize the errors object
  let customErrorObject: customThrowError = {
    statusCode: 400,
    statusMessage: "Bad request",
    data: [],
  };

  if (customErrorMessages.length == 0) {
    // set the data property of the api response object
    if (data) {
      apiResponse.data = data;
    } else {
      apiResponse.data = {
        totalItems: 0,
        items: [],
      };
    }
    return {};
  }

  for (let i = 0; i < customErrorMessages.length; i++) {
    // check if the expectedFrom property is one of the expected values
    if (!(customErrorMessages[i].expectedFrom in errorExpectedFroms)) {
      const reason = errorReasons.BadCustomErrorExpectedFrom;
      setStatusMessageAndCode(customErrorObject, 455);
      newError(
        customErrorObject,
        apiResponse.context,
        reason,
        devErrorReasonAndMessages[
          reason as keyof typeof devErrorReasonAndMessages
        ]
      );
      return { errors: customErrorObject };
    }

    /*
     * set the status code and status message
     * check if the reason property is one of the expected values
     * if not Handle the case where the reason property is not in the expected custom error object
     * if it is, add the custom error message to the errors array
     */
    switch (customErrorMessages[i].expectedFrom) {
      case errorExpectedFroms.Prisma:
        const reason = customErrorMessages[i].reason;
        // set the status code and status message
        setStatusMessageAndCode(customErrorObject, 453);
        // check if the reason property is in the expected custom error object
        if (reason in prismaErrorReasonAndMessages) {
          // add the custom error message to the errors array
          newError(
            customErrorObject,
            errorExpectedFroms.Prisma,
            reason,
            prismaErrorReasonAndMessages[
              reason as keyof typeof prismaErrorReasonAndMessages
            ],
            customErrorMessages[i].table,
            customErrorMessages[i].target
          );
        } else {
          // Handle the case where the reason property is not in the expected custom error object
          badCustomErrorReason(apiResponse, customErrorObject);
        }
        break;
      case errorExpectedFroms.User:
        setStatusMessageAndCode(customErrorObject, 452);
        if (customErrorMessages[i].reason in userErrorReasonAndMessages) {
          newError(
            customErrorObject,
            apiResponse.context,
            customErrorMessages[i].reason,
            userErrorReasonAndMessages[
              customErrorMessages[i]
                .reason as keyof typeof userErrorReasonAndMessages
            ]
          );
        } else {
          badCustomErrorReason(apiResponse, customErrorObject);
        }
        break;
      case errorExpectedFroms.Server:
        setStatusMessageAndCode(customErrorObject, 456);
        if (customErrorMessages[i].reason in serverErrorReasonAndMessages) {
          newError(
            customErrorObject,
            apiResponse.context,
            customErrorMessages[i].reason,
            serverErrorReasonAndMessages[
              customErrorMessages[i]
                .reason as keyof typeof serverErrorReasonAndMessages
            ]
          );
        } else {
          badCustomErrorReason(apiResponse, customErrorObject);
        }
        break;
      case errorExpectedFroms.Invite:
        setStatusMessageAndCode(customErrorObject, 456);
        if (customErrorMessages[i].reason in inviteErrorReasonAndMessages) {
          newError(
            customErrorObject,
            apiResponse.context,
            customErrorMessages[i].reason,
            inviteErrorReasonAndMessages[
              customErrorMessages[i]
                .reason as keyof typeof inviteErrorReasonAndMessages
            ]
          );
        } else {
          badCustomErrorReason(apiResponse, customErrorObject);
        }
        break;
      case errorExpectedFroms.Image:
        setStatusMessageAndCode(customErrorObject, 457);
        if (customErrorMessages[i].reason in imageErrorReasonAndMessages) {
          newError(
            customErrorObject,
            apiResponse.context,
            customErrorMessages[i].reason,
            imageErrorReasonAndMessages[
              customErrorMessages[i]
                .reason as keyof typeof imageErrorReasonAndMessages
            ]
          );
        } else {
          badCustomErrorReason(apiResponse, customErrorObject);
        }
        break;
    }
  }
  return { errors: customErrorObject };
};

/**
 * Appends a custom error message to the given errors object.
 * indicating that the custom error reason was not in the expected custom error object.
 *
 * @param {ApiResponse} apiResponse - The ApiResponse object containing the domain.
 * @param {customThrowError} errors - The customThrowError object containing the errors.
 */
const badCustomErrorReason = (
  apiResponse: ApiResponse,
  errors: customThrowError
) => {
  if (!apiResponse.context) {
    return;
  }
  const reason = errorReasons.BadCustomErrorReason;
  errors.data.push({
    domain: apiResponse.context,
    reason: reason,
    message:
      devErrorReasonAndMessages[
        reason as keyof typeof devErrorReasonAndMessages
      ],
  });
};
/**
 * Sets the status code and status message of the given customThrowError object.
 * based on the given httpCode.
 *
 * @param {customThrowError} customErrorObject - The customThrowError object to set.
 * @param {number} httpCode - The http code used to set the status code and status message.
 */
const setStatusMessageAndCode = (
  customErrorObject: customThrowError,
  httpCode: number
) => {
  customErrorObject.statusCode = httpCode;
  customErrorObject.statusMessage =
    errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes];
};

/**
 * Adds a new error to the given customThrowError object.
 *
 * @param {customThrowError} customErrorObject - The customThrowError object to add the error to.
 * @param {string} domain - The domain of the error.
 * @param {string} reason - The reason of the error.
 * @param {string} message - The message of the error. If the message contains {table} or {target}, it will be replaced with the given table or target.
 * @param {string} [table] - The table to replace {table} with in the message.
 * @param {string} [target] - The target to replace {target} with in the message.
 */
const newError = (
  customErrorObject: customThrowError,
  domain: string,
  reason: string,
  message: string,
  table?: string,
  target?: any
) => {
  customErrorObject.data.push({
    domain: domain,
    reason: reason,
    message: message
      .replace("{table}", table as string)
      .replace("{target}", target as string),
  });
};

export { apiResponseHandler };
