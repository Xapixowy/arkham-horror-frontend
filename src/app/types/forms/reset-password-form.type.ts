import { RegisterFormControls } from '@Enums/form-controls/register-form-controls.enum';
import { FormControl } from '@angular/forms';

export type ResetPasswordForm = {
  [RegisterFormControls.EMAIL]: FormControl<string | null>;
  [RegisterFormControls.PASSWORD]: FormControl<string | null>;
  [RegisterFormControls.PASSWORD_CONFIRMATION]: FormControl<string | null>;
};
