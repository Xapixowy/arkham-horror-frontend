import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function textInHtmlRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueWithoutHtml = control?.value ? control.value.replace(/<\/?[^>]+(>|$)/g, '') : '';

    return valueWithoutHtml.length > 0 ? null : {required: true};
  };
}

