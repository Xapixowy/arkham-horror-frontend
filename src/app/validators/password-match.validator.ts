import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormValidationError } from '@Enums/form-validation-error.enum';

export function passwordMatchValidator(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isParentAndHasValues = !!control.parent && !!control.parent.value;

    if (!isParentAndHasValues) {
      return null;
    }

    const matchControl: AbstractControl = (control.parent?.controls as any)[matchTo];
    const isMatchToAndHasValues = !!matchControl && !!matchControl.value;

    if (!isMatchToAndHasValues) {
      return null;
    }

    const isMatch = control.value === (control.parent?.controls as any)[matchTo].value;

    if (!isMatch) {
      matchControl.setErrors({
        [FormValidationError.PASSWORD_MISMATCH]: true,
        ...matchControl.errors,
      });
    } else {
      const newErrors = matchControl.errors;
      if (newErrors) {
        delete newErrors[FormValidationError.PASSWORD_MISMATCH];
        const isObjectEmpty = Object.keys(newErrors).length === 0;
        matchControl.setErrors(isObjectEmpty ? null : newErrors);
      }
    }

    return isMatch ? null : { [FormValidationError.PASSWORD_MISMATCH]: true };
  };
}
