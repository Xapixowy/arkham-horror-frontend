export enum HttpError {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  SOMETHING_WRONG = 'SOMETHING_WRONG',
  NOT_FOUND = 'NOT_FOUND',
  FILE_MISSING = 'FILE_MISSING',
  FILE_WRONG_FILE_TYPE = 'FILE_WRONG_FILE_TYPE',
  FILE_MAXIMUM_SIZE_EXCEEDED = 'FILE_MAXIMUM_SIZE_EXCEEDED',
  FILE_DELETE_FAILED = 'FILE_DELETE_FAILED',
  USER_EXISTS = 'USER_EXISTS',
  USER_EMAIL_AND_TOKEN_MISMATCH = 'USER_EMAIL_AND_TOKEN_MISMATCH',
  USER_NOT_VERIFIED = 'USER_NOT_VERIFIED',
  USER_WRONG_PASSWORD = 'USER_WRONG_PASSWORD',
  USER_PASSWORD_MISMATCH = 'USER_PASSWORD_MISMATCH',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_SEND_FAILURE = 'EMAIL_SEND_FAILURE',
  TRANSLATION_EXISTS = 'TRANSLATION_EXISTS',
  LANGUAGE_NOT_SUPPORTED = 'LANGUAGE_NOT_SUPPORTED',
  PLAYER_EXISTS = 'PLAYER_EXISTS',
  PLAYERS_LIMIT_REACHED = 'PLAYERS_LIMIT_REACHED',
  PLAYER_TOKEN_INVALID = 'PLAYER_TOKEN_INVALID',
  CHARACTER_TRANSLATION_NOT_FOUND = 'CHARACTER_TRANSLATION_NOT_FOUND',
  CHARACTER_NOT_FOUND = 'CHARACTER_NOT_FOUND',
  GAME_SESSION_NOT_FOUND = 'GAME_SESSION_NOT_FOUND',
  CARD_NOT_FOUND = 'CARD_NOT_FOUND',
  PLAYER_NOT_FOUND = 'PLAYER_NOT_FOUND',
  CARD_TRANSLATION_NOT_FOUND = 'CARD_TRANSLATION_NOT_FOUND',
}
