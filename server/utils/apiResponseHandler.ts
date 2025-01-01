const errorReasonAndMessages ={
  PasswordValidationFailed : "Password is not valid it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  EmailValidationFailed : "Email is not valid",
  UsernameValidationFailed : "Username is not in the correct format it must be between 3 and 32 characters long and can only contain letters, numbers and underscores",
  FirstNameValidationFailed:"First name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
  LastNameValidationFailed:"Last name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
  MissingParameters:"Some required parameters were missing",
  PasswordHashingFailed:"Some error occurred while hashing the password",
  TableNotFound:"Can't read from the {table} table because it doesn't exist",
  UniqueConstraintFailed: "The unique constraint failed on the {table} table with the following values: {target}",
  IdentifierNotFound: "Oparation failed on {table} table because the record with  id: {target} doesn't exist",
  ValidationError: "Something was not in the correct format",
  UnknownError: "An unknown error occurred",
}

const errorHttpStatusCodes = {
  452: "UserValidationFailed",
  453: "PrismaResponseFailed",
}

/**
 * Handles API response creation based on custom error messages and event context.
 *
 * Depending on the presence and source of custom error messages, the function constructs
 * an appropriate ApiResponse object with corresponding HTTP status codes and error details.
 *
 * - If no custom errors are present, sets a success response with HTTP 200.
 * - If errors originate from Prisma, sets an HTTP 453 response with Prisma-related error details.
 * - If errors originate from User validation, sets an HTTP 452 response with user-related error details.
 * - For unknown errors, sets an HTTP 500 response with a generic error message.
 *
 * @param {any} event - The event object containing the context and ApiResponse reference.
 * @param {CustomErrorMessage[]} customErrorMessages - An array of error messages detailing the issues encountered.
 */

const apiResponseHandler = (event: any, customErrorMessages: CustomErrorMessage[]) => {
  const apiResponse = event.context.apiResponse;
  if (customErrorMessages.length == 0)
  {
    const httpCode = 200
    setHttpCodeAndMessage(event,apiResponse,httpCode, errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes])
    return
  }
  apiResponse.error = {
    code: "400",
    message: "Bad request",
    errors: [],
  }
  if (customErrorMessages[0].espectedFrom ==="Prisma") {
    const reason = customErrorMessages[0].message;
    const httpCode = 453
    if (reason in errorReasonAndMessages) {
      apiResponse.error.errors.push({
        domain: "Prisma",
        reason: reason,
        message:
          errorReasonAndMessages[reason as keyof typeof errorReasonAndMessages].replace("{table}",customErrorMessages[0].table as string).replace("{target}",customErrorMessages[0].target as string),
      });

      setHttpCodeAndMessage(event,apiResponse,httpCode, errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes])
  }
  }else if(customErrorMessages[0].espectedFrom === "User"){
    const httpCode = 452
    for (let i = 0; i < customErrorMessages.length; i++) {
      const reason = customErrorMessages[i].message;
      if (reason in errorReasonAndMessages) {
        apiResponse.error.errors.push({
          domain: apiResponse.context,
          reason: reason,
          message:
            errorReasonAndMessages[reason as keyof typeof errorReasonAndMessages],
        });
    }
    setHttpCodeAndMessage(event,apiResponse,httpCode, errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes])
  }
  } else{
    const httpCode = 500
    apiResponse.error = {
      code: "500",
      message: `An unknown error occurred`,
      errors: [
        {
          domain: event.context.apiResponse.context,
          reason: "UnknownError",
          message: "An unknown error occurred",
        },
      ],
    };
    setHttpCodeAndMessage(event,apiResponse,httpCode, errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes])
  }
  event.context.apiResponse = apiResponse
}

/**
 * Sets the http code and message of the response.
 *
 * @param {any} event - The event object containing the context and ApiResponse reference and the node response.
 * @param {ApiResponse} apiResponse - The ApiResponse object to set the http code and message on.
 * @param {number} httpCode - The http status code to set.
 * @param {string} message - The http status message to set.
 */
const setHttpCodeAndMessage = (event: any,apiResponse: ApiResponse,httpCode: number, message: string) => {
  if (!httpCode || !message) {
    return
  }
  if (apiResponse.error) {
    apiResponse.error.code = httpCode.toString()
    apiResponse.error.message = message
  }
  if (event.node.res) {
    event.node.res.statusCode = httpCode
    event.node.res.statusMessage = message
  }
}
export {
  apiResponseHandler
}