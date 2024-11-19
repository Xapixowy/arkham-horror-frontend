import { RegisterFormControls } from '@Enums/form-controls/register-form-controls.enum';
import { Validators } from '@angular/forms';
import { passwordMatchValidator } from '@Validators/password-match.validator';
import { noWhiteSpaceValidator } from '@Validators/no-white-space.validator';
import { strongPasswordValidator } from '@Validators/strong-password.validator';

export const RESET_PASSWORD_FORM_VALIDATORS = {
  [RegisterFormControls.EMAIL]: [Validators.required, Validators.email],
  [RegisterFormControls.PASSWORD]: [
    Validators.required,
    noWhiteSpaceValidator(),
    strongPasswordValidator(),
    passwordMatchValidator(RegisterFormControls.PASSWORD_CONFIRMATION),
  ],
  [RegisterFormControls.PASSWORD_CONFIRMATION]: [
    Validators.required,
    noWhiteSpaceValidator(),
    strongPasswordValidator(),
    passwordMatchValidator(RegisterFormControls.PASSWORD),
  ],
};
