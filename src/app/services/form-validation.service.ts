import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormValidationError } from '@Enums/form-validation-error.enum';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  private readonly translocoService = inject(TranslocoService);

  getErrorMessage(control: AbstractControl | null): string {
    if (!control?.errors) {
      return '';
    }

    const errorKey = Object.keys(control.errors)[0] as FormValidationError;
    const errorValue = control.errors[errorKey];

    switch (errorKey) {
      case FormValidationError.REQUIRED:
        return this.getTranslatedMessage('Required');
      case FormValidationError.MIN_LENGTH:
        return this.getTranslatedMessage('Minimum characters', {
          value: errorValue.requiredLength,
        });
      case FormValidationError.MAX_LENGTH:
        return this.getTranslatedMessage('Maximum characters', {
          value: errorValue.requiredLength,
        });
      case FormValidationError.PATTERN:
        return this.getTranslatedMessage('Pattern');
      case FormValidationError.PASSWORD_MISMATCH:
        return this.getTranslatedMessage('Password mismatch');
      case FormValidationError.WHITESPACE:
        return this.getTranslatedMessage('Whitespace');
      case FormValidationError.WHITESPACE_LEADING_TRAILING:
        return this.getTranslatedMessage('Whitespace leading or trailing');
      case FormValidationError.STRONG_PASSWORD:
        return this.getTranslatedMessage('Strong password');
      case FormValidationError.ARRAY_LENGTH_BIGGER:
        return this.getTranslatedMessage('Array length bigger by', {
          value: errorValue,
        });
      case FormValidationError.ARRAY_LENGTH_SMALLER:
        return this.getTranslatedMessage('Array length smaller by', {
          value: errorValue,
        });
      default:
        return this.getTranslatedMessage('Wrong value');
    }
  }

  hasFormControlErrors(control: AbstractControl | null): boolean {
    return !!control && (control.dirty || control.touched) && control.invalid;
  }

  private getTranslatedMessage(
    message: string,
    params?: {
      [key: string]: string;
    },
  ): string {
    return this.translocoService.translate(`_Validators.${message}`, params);
  }

  static isFormInvalid(form: FormGroup): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      Object.values(form.controls).forEach((control) => control.markAsDirty());
      return true;
    }

    return false;
  }
}
