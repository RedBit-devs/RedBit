import {
  type CustomErrorMessage,
  type customThrowError,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

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
  MissingParameters: "Some required parameters were missing",
  PasswordHashingFailed: "Some error occurred while hashing the password",
  Unauthorized: "Authentication required you are not logged in",
  EmailDoesntMatch: "Provided email does not match expected email",

};

const prismaErrorReasonAndMessages = {
  TableNotFound: "Can't read from the {table} table because it doesn't exist",
  UniqueConstraintFailed:
    "The unique constraint failed on the {table} table with the following values: {target}",
  IdentifierNotFound:
    "Oparation failed on {table} table because the record with  id: {target} doesn't exist",
  ValidationError: "Something was not in the correct format",
  UnknownError: "An unknown error occurred",
  NoDatabaseResponse: "Database did not provide a response"
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
};

/**
 * Handles API response creation based on custom error messages and event context.
 *
 * Depending on the presence and source of custom error messages, the function constructs
 * an appropriate ApiResponse object with corresponding HTTP status codes and error details.
 *
 * - If no custom errors are present, sets a success response with HTTP 200.
 * - If errors originate from Prisma, sets an HTTP 453 response with Prisma-related error details.
 * - If errors originate from User validation, sets an HTTP 452 response with user-related error details.
 * - If the error is not expected from any known source , sets an HTTP 455 response with the releted error details.
 * - If the error reason is not in the expected custom error object , sets an HTTP 454 response with the releted error details.
 * - Unknown errors are expected errors in the error messages thats why there are no handling for that specific type of error
 *
 * @param {any} event - The event object containing the context and ApiResponse reference.
 * @param {CustomErrorMessage[]} customErrorMessages - An array of error messages detailing the issues encountered.
 */

const apiResponseHandler = (
  event: any,
  customErrorMessages: CustomErrorMessage[],
  data?: ResponseData
): any => {
  const apiResponse = event.context.apiResponse;
  let customErrorObject: customThrowError = {
    statusCode: 400,
    statusMessage: "Bad request",
    data: [],
  };

  if (customErrorMessages.length == 0) {
    if (data) {
      apiResponse.data = data;
    } else {
      apiResponse.data = {
        totalItems: 0,
        items: [],
      };
    }
    return { errors: customErrorObject };
  }

  if (!(customErrorMessages[0].expectedFrom in errorExpectedFroms)) {
    //const httpCode = 455;
    const reason = errorReasons.BadCustomErrorExpectedFrom;
    setStatusMessageAndCode(customErrorObject, 455);
    newError(customErrorObject, apiResponse.context, reason, devErrorReasonAndMessages[reason as keyof typeof devErrorReasonAndMessages]);
    return { errors: customErrorObject };
  }

  if (customErrorMessages[0].expectedFrom === errorExpectedFroms.Prisma) {
    const reason = customErrorMessages[0].reason;
    setStatusMessageAndCode(customErrorObject, 453);
    if (reason in prismaErrorReasonAndMessages) {
      newError(customErrorObject, apiResponse.context, reason, prismaErrorReasonAndMessages[reason as keyof typeof prismaErrorReasonAndMessages], customErrorMessages[0].table, customErrorMessages[0].target);
    } else {
      badCustomErrorReason(event, apiResponse);
    }
    return { errors: customErrorObject };
  } else if (customErrorMessages[0].expectedFrom === errorExpectedFroms.User) {
    setStatusMessageAndCode(customErrorObject, 452);
    for (let i = 0; i < customErrorMessages.length; i++) {
      const reason = customErrorMessages[i].reason;
      if (reason in userErrorReasonAndMessages) {
        newError(customErrorObject, apiResponse.context, reason, userErrorReasonAndMessages[reason as keyof typeof userErrorReasonAndMessages]);
      } else {
        badCustomErrorReason(event, apiResponse);
      }
    }
    return { errors: customErrorObject };
  }
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
const newError = (customErrorObject: customThrowError,domain: string, reason: string, message: string, table?: string, target?: any) => {
  customErrorObject.data.push({
    domain: domain,
    reason: reason,
    message: message
      .replace("{table}", table as string)
      .replace("{target}", target as string),
  });
};

export { apiResponseHandler };
