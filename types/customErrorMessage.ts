type CustomErrorMessagetest = {
    expectedFrom: errorExpectedFroms;
    reason: errorReasons;
    table?: string;
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