import {Validators} from '@angular/forms';
import {NewCardFormControls} from '@Enums/form-controls/new-card-form-controls.enum';
import {textInHtmlRequiredValidator} from '@Validators/text-in-html-required.validator';

export const NEW_CARD_FORM_VALIDATORS = {
  [NewCardFormControls.NAME]: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
  [NewCardFormControls.DESCRIPTION]: [Validators.required, textInHtmlRequiredValidator()],
  [NewCardFormControls.TYPE]: [Validators.required],
  [NewCardFormControls.FRONT_IMAGE]: [Validators.required],
  [NewCardFormControls.BACK_IMAGE]: [Validators.required],
  [NewCardFormControls.HAND_USAGE]: [Validators.min(1), Validators.max(2)],
};
