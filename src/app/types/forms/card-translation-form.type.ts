import { FormControl } from '@angular/forms';
import { CardTranslationFormControls } from '@Enums/form-controls/card-translation-form-controls.enum';
import { Language } from '@Features/language/_enums/language.enum';

export type CardTranslationForm = {
  [CardTranslationFormControls.ID]: FormControl<number | null>;
  [CardTranslationFormControls.NAME]: FormControl<string | null>;
  [CardTranslationFormControls.DESCRIPTION]: FormControl<string | null>;
  [CardTranslationFormControls.LOCALE]: FormControl<Language | null>;
};
