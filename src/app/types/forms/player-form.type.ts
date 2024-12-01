import {FormControl} from '@angular/forms';
import {PlayerFormControls} from '@Enums/form-controls/player-controls.enum';

export type PlayerForm = {
  [PlayerFormControls.STATUS_ENDURANCE]: FormControl<number | null>;
  [PlayerFormControls.STATUS_SANITY]: FormControl<number | null>;
  [PlayerFormControls.EQUIPMENT_MONEY]: FormControl<number | null>;
  [PlayerFormControls.EQUIPMENT_CLUES]: FormControl<number | null>;
  [PlayerFormControls.ATTRIBUTES_SPEED]: FormControl<number | null>;
  [PlayerFormControls.ATTRIBUTES_SNEAK]: FormControl<number | null>;
  [PlayerFormControls.ATTRIBUTES_PROWESS]: FormControl<number | null>;
  [PlayerFormControls.ATTRIBUTES_WILL]: FormControl<number | null>;
  [PlayerFormControls.ATTRIBUTES_KNOWLEDGE]: FormControl<number | null>;
  [PlayerFormControls.ATTRIBUTES_LUCK]: FormControl<number | null>;
  [PlayerFormControls.ADD_CARD_IDS]: FormControl<number[] | null>;
  [PlayerFormControls.REMOVE_CARD_IDS]: FormControl<number[] | null>;
}
