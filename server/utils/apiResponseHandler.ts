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
  BadCustomErrorReason: "The given custom error reason is not in the expected custom error object,The given custom error reason was: {reason}",
  BadCustomErrorExpectedFrom: "The given custom error expected from is not in the api response handler,The given custom error expected from was: {expectedFrom}",
}

const errorHttpStatusCodes = {
  452: "UserValidationFailed",
  453: "PrismaResponseFailed",
  454: "BadCustomErrorReason",
  455: "BadCustomErrorExpectedFrom",
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
 * - If the error is not expected from any known source , sets an HTTP 455 response with the releted error details.
 * - If the error reason is not in the expected custom error object , sets an HTTP 454 response with the releted error details.
 * - Unknown errors are expected errors in the error messages thats why there are no handling for that specific type of error
 *
 * @param {any} event - The event object containing the context and ApiResponse reference.
 * @param {CustomErrorMessage[]} customErrorMessages - An array of error messages detailing the issues encountered.
 */

const apiResponseHandler = (event: any, customErrorMessages: CustomErrorMessage[], data?: any) => {
  const apiResponse = event.context.apiResponse;
  if (customErrorMessages.length == 0)
  {
    if (data) {
      apiResponse.data = data;
    }
    return
  }
  apiResponse.error = {
    code: "400",
    message: "Bad request",
    errors: [],
  }
  if (customErrorMessages[0].espectedFrom ==="Prisma") {
    const reason = customErrorMessages[0].reason;
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
  else{
    badCustomErrorReason(event,apiResponse,customErrorMessages[0].reason)
  }
  }else if(customErrorMessages[0].espectedFrom === "User"){
    const httpCode = 452
    for (let i = 0; i < customErrorMessages.length; i++) {
      const reason = customErrorMessages[i].reason;
      if (reason in errorReasonAndMessages) {
        apiResponse.error.errors.push({
          domain: apiResponse.context,
          reason: reason,
          message:
            errorReasonAndMessages[reason as keyof typeof errorReasonAndMessages],
        }); 
    }
    else{
      badCustomErrorReason(event,apiResponse,customErrorMessages[i].reason)
    }
    if(!event.node.res.statusMessage){
      setHttpCodeAndMessage(event,apiResponse,httpCode, errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes])
    }
  }
  } else{
    const httpCode = 455
    const reason = "BadCustomErrorExpectedFrom"
    apiResponse.error = {
      code: httpCode.toString(),
      message: errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes],
      errors: [
        {
          domain: event.context.apiResponse.context,
          reason:reason,
          message: 
            errorReasonAndMessages[reason as keyof typeof errorReasonAndMessages].replace("{expectedFrom}",customErrorMessages[0].espectedFrom),
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
const badCustomErrorReason = (event: any,apiResponse: ApiResponse,reason: string) => {
  const httpCode = 454
  const actualReason = "BadCustomErrorMessage"
  if(!apiResponse.error?.errors)
  {
    return
  }
  apiResponse.error.errors.push({
    domain: event.context.apiResponse.context,
    reason: actualReason,
    message:
    errorReasonAndMessages[actualReason as keyof typeof errorReasonAndMessages].replace("{reason}",reason),
  });
  setHttpCodeAndMessage(event,apiResponse,httpCode, errorHttpStatusCodes[httpCode as keyof typeof errorHttpStatusCodes])
}


export {
  apiResponseHandler
}