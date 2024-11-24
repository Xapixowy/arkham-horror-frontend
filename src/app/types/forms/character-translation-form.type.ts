import { FormControl } from '@angular/forms';
import { Skill } from '@Types/characters/skill.type';
import { CharacterTranslationFormControls } from '@Enums/form-controls/character-translation-form-controls.enum';
import { Language } from '@Features/language/_enums/language.enum';

export type CharacterTranslationForm = {
  [CharacterTranslationFormControls.ID]: FormControl<number | null>;
  [CharacterTranslationFormControls.NAME]: FormControl<string | null>;
  [CharacterTranslationFormControls.DESCRIPTION]: FormControl<string | null>;
  [CharacterTranslationFormControls.PROFESSION]: FormControl<string | null>;
  [CharacterTranslationFormControls.STARTING_LOCATION]: FormControl<string | null>;
  [CharacterTranslationFormControls.SKILLS]: FormControl<Skill[] | null>;
  [CharacterTranslationFormControls.LOCALE]: FormControl<Language | null>;
};
