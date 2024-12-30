const errorReasonAndMessages ={
  PasswordValidationFailed : "Password is not valid it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  EmailValidationFailed : "Email is not valid",
  UsernameValidationFailed : "Username is not in the correct format it must be between 3 and 32 characters long and can only contain letters, numbers and underscores",
  FirstNameValidationFailed:"First name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
  LastNameValidationFailed:"Last name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
  TableNotFound:"Can't read from the {table} table because it doesn't exist",
  UniqueConstraintFailed: "The unique constraint failed on the {table} table with the following values: {target}",
  IdentifierNotFound: "Oparation failed on {table} table because the record with  id: {target} doesn't exist",
  ValidationError: "Something was not in the correct format",
  UnknownError: "An unknown error occurred",
}

const errorHttpStatusCodes = {
  452: "UserValidationFailed",
}

const ApiResponseHandler = (event: any, customErrorMessages: CustomErrorMessage[]) => {
  const apiResponse = event.context.apiResponse;
  apiResponse.error = {
    code: "400",
    message: "Some errors occured",
    errors: [],
  }
  if (customErrorMessages.length == 0) 
  {
    return
  }
  if (customErrorMessages[0].espectedFrom ==="Prisma") {
    const reason = customErrorMessages[0].message;
    if (reason in errorReasonAndMessages) {
      apiResponse.error.errors.push({
        domain: "Prisma",
        reason: reason,
        message:
          errorReasonAndMessages[reason as keyof typeof errorReasonAndMessages].replace("{table}",customErrorMessages[0].table as string).replace("{target}",customErrorMessages[0].target as string),
      });
  }
  }else if(customErrorMessages[0].espectedFrom ==="User"){
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
  }
  } else{
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
  }
  event.context.apiResponse = apiResponse
}

export {
  ApiResponseHandler
}