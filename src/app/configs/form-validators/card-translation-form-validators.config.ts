import { Validators } from '@angular/forms';
import { CardFormControls } from '@Enums/form-controls/card-form-controls.enum';
import { textInHtmlRequiredValidator } from '@Validators/text-in-html-required.validator';

export const CARD_TRANSLATION_FORM_VALIDATORS = {
  [CardFormControls.NAME]: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
  [CardFormControls.DESCRIPTION]: [Validators.required, textInHtmlRequiredValidator()],
};
