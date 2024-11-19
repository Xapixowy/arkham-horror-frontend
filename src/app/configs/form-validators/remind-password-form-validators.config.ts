import { Validators } from '@angular/forms';
import { RemindPasswordFormControls } from '@Enums/form-controls/remind-password-form-controls.enum';

export const REMIND_PASSWORD_FORM_VALIDATORS = {
  [RemindPasswordFormControls.EMAIL]: [Validators.required, Validators.email],
};
