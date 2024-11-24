import { Validators } from '@angular/forms';
import { textInHtmlRequiredValidator } from '@Validators/text-in-html-required.validator';
import { CharacterTranslationFormControls } from '@Enums/form-controls/character-translation-form-controls.enum';

export const CHARACTER_TRANSLATION_FORM_VALIDATORS = {
  [CharacterTranslationFormControls.NAME]: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
  [CharacterTranslationFormControls.DESCRIPTION]: [Validators.required, textInHtmlRequiredValidator()],
  [CharacterTranslationFormControls.PROFESSION]: [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(64),
  ],
  [CharacterTranslationFormControls.STARTING_LOCATION]: [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(64),
  ],
  [CharacterTranslationFormControls.SKILLS]: [Validators.required],
};
