import { FormControl } from '@angular/forms';
import { CharacterFormControls } from '@Enums/form-controls/character-form-controls.enum';

export type CharacterSkillForm = {
  [CharacterFormControls.NAME]: FormControl<string | null>;
  [CharacterFormControls.DESCRIPTION]: FormControl<string | null>;
};
