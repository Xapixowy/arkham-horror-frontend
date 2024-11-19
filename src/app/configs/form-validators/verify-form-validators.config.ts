import { Validators } from '@angular/forms';
import { VerifyFormControls } from '@Enums/form-controls/verify-form-controls.enum';

export const VERIFY_FORM_VALIDATORS = {
  [VerifyFormControls.EMAIL]: [Validators.required, Validators.email],
};
