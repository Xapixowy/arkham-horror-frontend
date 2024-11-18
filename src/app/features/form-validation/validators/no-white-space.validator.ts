import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {NO_WHITE_SPACE_VALIDATOR_CONFIG} from '@Features/form-validation/_configs/no-white-space-validator.config';
import {FormValidationError} from '@Features/form-validation/_enums/form-validation-error.enum';

export function noWhiteSpaceValidator(onlyLeadingTrailing = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (onlyLeadingTrailing) {
      return NO_WHITE_SPACE_VALIDATOR_CONFIG.leadingTrailingRegex.test(control.value || '') ? {[FormValidationError.WHITESPACE_LEADING_TRAILING]: true} : null;
    }
    return NO_WHITE_SPACE_VALIDATOR_CONFIG.whitespaceRegex.test(control.value || '') ? {[FormValidationError.WHITESPACE]: true} : null;
  };
}
