import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {FormValidationError} from '@Features/form-validation/_enums/form-validation-error.enum';

export function matchValidator(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isParentAndHasValues = !!control.parent && !!control.parent.value;
    const isMatchToAndHasValues = !!(control.parent?.controls as any)[matchTo] && !!(control.parent?.controls as any)[matchTo].value;

    if (!isParentAndHasValues || !isMatchToAndHasValues) {
      return null;
    }

    const isMatch = control.value === (control.parent?.controls as any)[matchTo].value;

    return isMatch ? null : {[FormValidationError.MISMATCH]: true};
  };
}
