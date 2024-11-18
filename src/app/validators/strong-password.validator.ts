import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormValidationError } from '@Enums/form-validation-error.enum';
import { REGEX_CONFIG } from '@Configs/regex.config';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !REGEX_CONFIG.strongPasswordRegex.test(control.value || '')
      ? { [FormValidationError.STRONG_PASSWORD]: true }
      : null;
  };
}
