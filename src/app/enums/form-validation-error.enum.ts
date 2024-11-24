export enum FormValidationError {
  REQUIRED = 'required',
  MIN_LENGTH = 'minlength',
  MAX_LENGTH = 'maxlength',
  PATTERN = 'pattern',
  PASSWORD_MISMATCH = 'passwordMismatch',
  WHITESPACE = 'whitespace',
  WHITESPACE_LEADING_TRAILING = 'whitespaceLeadingTrailing',
  STRONG_PASSWORD = 'strongPassword',
  ARRAY_LENGTH_BIGGER = 'arrayLengthBigger',
  ARRAY_LENGTH_SMALLER = 'arrayLengthSmaller',
}
