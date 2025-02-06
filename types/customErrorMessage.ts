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
  Unauthorized = "Unauthorized",
  EmailDoesntMatch = "EmailDoesntMatch",
  NoDatabaseResponse = "NoDatabaseResponse",
  FailedToLogin = "FailedToLogin",
  Expired = "Expired",
  ServerAccessDenied = "ServerAccessDenied",
}
enum errorExpectedFroms {
  Prisma = "Prisma",
  User = "User",
  Server = "Server",
  Invite = "Invite"
}

export {
  type CustomErrorMessage,
  type customThrowError,
  errorReasons,
  errorExpectedFroms,
};
