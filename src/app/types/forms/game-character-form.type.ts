import { FormControl } from '@angular/forms';
import { GameCharacterFormControls } from '@Enums/form-controls/game-character-form-controls.enum';

export type GameCharacterForm = {
  [GameCharacterFormControls.SANITY]: FormControl<number | null>;
  [GameCharacterFormControls.ENDURANCE]: FormControl<number | null>;
  [GameCharacterFormControls.ATTRIBUTES_SPEED]: FormControl<number | null>;
  [GameCharacterFormControls.ATTRIBUTES_SNEAK]: FormControl<number | null>;
  [GameCharacterFormControls.ATTRIBUTES_PROWESS]: FormControl<number | null>;
  [GameCharacterFormControls.ATTRIBUTES_WILL]: FormControl<number | null>;
  [GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE]: FormControl<number | null>;
  [GameCharacterFormControls.ATTRIBUTES_LUCK]: FormControl<number | null>;
};
