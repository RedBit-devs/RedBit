type CustomErrorMessagetest = {
    expectedFrom: errorExpectedFroms;
    reason: errorReasons;
    table?: string;
    target?: unknown;
}

enum errorReasons {
    PasswordValidationFailed = "Password is not valid it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    EmailValidationFailed = "Email is not valid",
    UsernameValidationFailed = "Username is not in the correct format it must be between 3 and 32 characters long and can only contain letters, numbers and underscores",
    FirstNameValidationFailed="First name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
    LastNameValidationFailed="Last name is not in the correct format it must be between 3 and 35 characters long and can only contain letters",
    MissingParameters="Some required parameters were missing",
    PasswordHashingFailed = "Some error occurred while hashing the password",
    TableNotFound="Can't read from the {table} table because it doesn't exist",
    UniqueConstraintFailed= "The unique constraint failed on the {table} table with the following values: {target}",
    IdentifierNotFound= "Oparation failed on {table} table because the record with  id: {target} doesn't exist",
    ValidationError= "Something was not in the correct format",
    UnknownError= "An unknown error occurred",
    BadCustomErrorReason= "The given custom error reason is not in the expected custom error object,The given custom error reason was: {reason}",
    BadCustomErrorExpectedFrom = "The given custom error expected from is not in the api response handler,The given custom error expected from was: {expectedFrom}",
    DataDontMatch = "Provided data does not match expected data"
}
enum errorExpectedFroms {
    Prisma,
    User,
}

const errorHttpStatusCodes = {
    452: "UserValidationFailed",
    453: "PrismaResponseFailed",
    454: "BadCustomErrorReason",
    455: "BadCustomErrorExpectedFrom",
}



export {
    type CustomErrorMessagetest,
    errorReasons,
    errorExpectedFroms,
    errorHttpStatusCodes
}