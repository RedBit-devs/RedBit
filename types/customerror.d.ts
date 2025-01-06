enum CustomErrorReasons {
    PasswordValidationFailed,
    EmailValidationFailed,
    UsernameValidationFailed,
    FirstNameValidationFailed,
    LastNameValidationFailed,
    MissingParameters,
    PasswordHashingFailed,
    TableNotFound,
    UniqueConstraintFailed,
    IdentifierNotFound,
    ValidationError,
    UnknownError,
  }
type CustomErrorMessage = {
    espectedFrom: string;
    reason: CustomErrorReasons;
    table?: string;
    target?: unknown;
}