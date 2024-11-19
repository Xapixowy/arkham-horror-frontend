import { FormControl } from '@angular/forms';
import { VerifyFormControls } from '@Enums/form-controls/verify-form-controls.enum';

export type VerifyForm = {
  [VerifyFormControls.EMAIL]: FormControl<string | null>;
};
