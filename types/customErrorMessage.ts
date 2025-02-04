type CustomErrorMessage = {
  expectedFrom: errorExpectedFroms;
  reason: errorReasons;
  table?: string;
  target?: unknown;
};

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
  DataDontMatch = "DataDontMatch",
  Unauthorized = "Unauthorized",
}
enum errorExpectedFroms {
  Prisma = "Prisma",
  User = "User",
  Server = "Server",
}
enum tableNames {
  user = "user",
}

export {
  type CustomErrorMessage,
  errorReasons,
  errorExpectedFroms,
  tableNames,
};
