import { FormControl } from '@angular/forms';
import { RemindPasswordFormControls } from '@Enums/form-controls/remind-password-form-controls.enum';

export type RemindPasswordForm = {
  [RemindPasswordFormControls.EMAIL]: FormControl<string | null>;
};
