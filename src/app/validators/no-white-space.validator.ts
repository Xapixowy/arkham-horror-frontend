import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormValidationError } from '@Enums/form-validation-error.enum';
import { REGEX_CONFIG } from '@Configs/regex.config';

export function noWhiteSpaceValidator(onlyLeadingTrailing = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (onlyLeadingTrailing) {
      return REGEX_CONFIG.leadingTrailingRegex.test(control.value || '')
        ? { [FormValidationError.WHITESPACE_LEADING_TRAILING]: true }
        : null;
    }
    return REGEX_CONFIG.whitespaceRegex.test(control.value || '') ? { [FormValidationError.WHITESPACE]: true } : null;
  };
}
