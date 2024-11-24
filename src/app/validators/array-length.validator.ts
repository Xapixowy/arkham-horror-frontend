import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormValidationError } from '@Enums/form-validation-error.enum';

export function arrayLength(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.value || [];
    const isArrayBiggerThanLength = controlValue.length > length;
    if (isArrayBiggerThanLength) {
      return { [FormValidationError.ARRAY_LENGTH_BIGGER]: controlValue.length - length };
    }
    const isArraySmallerThanLength = controlValue.length < length;
    if (isArraySmallerThanLength) {
      return { [FormValidationError.ARRAY_LENGTH_SMALLER]: length - controlValue.length };
    }
    return null;
  };
}
