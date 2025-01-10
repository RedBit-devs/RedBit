type CustomErrorMessagetest = {
    expectedFrom: errorExpectedFroms;
    reason: errorReasons;
    table?: tableNames;
    target?: unknown;
}

enum errorReasons {
    PasswordValidationFailed = "PasswordValidationFailed",
    EmailValidationFailed = "EmailValidationFailed",
    UsernameValidationFailed = "UsernameValidationFailed",
    FirstNameValidationFailed = "FirstNameValidationFailed",
    LastNameValidationFailed = "LastNameValidationFailed",
    MissingParameters = "MissingParameters",
    PasswordHashingFailed = "PasswordHashingFailed",
    TableNotFound = "TableNotFound",
    UniqueConstraintFailed = "UniqueConstraintFailed",
    IdentifierNotFound = "IdentifierNotFound",
    ValidationError = "ValidationError",
    UnknownError = "UnknownError",
    BadCustomErrorReason = "BadCustomErrorReason",
    BadCustomErrorExpectedFrom = "BadCustomErrorExpectedFrom",
    DataDontMatch = "DataDontMatch"
}
enum errorExpectedFroms {
    Prisma = "Prisma",
    User = "User",
}
enum tableNames {
    user = "user",
}



export {
    type CustomErrorMessagetest,
    errorReasons,
    errorExpectedFroms,
    tableNames
}