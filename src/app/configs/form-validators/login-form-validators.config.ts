import { Validators } from '@angular/forms';
import { LoginFormControls } from '@Enums/form-controls/login-form-controls.enum';

export const LoginFormValidators = {
  [LoginFormControls.EMAIL]: [Validators.required, Validators.email],
  [LoginFormControls.PASSWORD]: [Validators.required],
};
