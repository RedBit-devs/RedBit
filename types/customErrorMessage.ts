type CustomErrorMessage = {
  expectedFrom: errorExpectedFroms;
  reason: errorReasons;
  table?: string;
  target?: unknown;
};


type customThrowError = {
  cause?: any;
  data: CustomError[];
  message?: string;
  name?: string;
  stack?: string;
  statusCode: number;
  statusMessage: string;
  fatal?: boolean;
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
  DataDontMatch = "DataDontMatch",
  AuthValidationFailed = "AuthValidationFailed",
}
enum errorExpectedFroms {
  Prisma = "Prisma",
  User = "User",
}
enum tableNames {
  user = "user",
}

export {
  type CustomErrorMessage,
  type customThrowError,
  errorReasons,
  errorExpectedFroms,
  tableNames,
};
