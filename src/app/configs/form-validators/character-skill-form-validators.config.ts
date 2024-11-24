import { Validators } from '@angular/forms';
import { textInHtmlRequiredValidator } from '@Validators/text-in-html-required.validator';
import { CharacterFormControls } from '@Enums/form-controls/character-form-controls.enum';

export const CHARACTER_SKILL_FORM_VALIDATORS = {
  [CharacterFormControls.NAME]: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
  [CharacterFormControls.DESCRIPTION]: [Validators.required, textInHtmlRequiredValidator()],
};
