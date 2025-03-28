export const REGEX_CONFIG = {
  whitespaceRegex: /^\s+$/,
  leadingTrailingRegex: /^\s+|\s+$/g,
  strongPasswordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  gameSessionTokenRegex: /^[A-Z0-9]{6}$/,
};
