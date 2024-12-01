import {Validators} from '@angular/forms';
import {PlayerFormControls} from '@Enums/form-controls/player-controls.enum';

export const PLAYER_FORM_VALIDATORS = {
  [PlayerFormControls.STATUS_ENDURANCE]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.STATUS_SANITY]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.EQUIPMENT_MONEY]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.EQUIPMENT_CLUES]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.ATTRIBUTES_SPEED]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.ATTRIBUTES_SNEAK]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.ATTRIBUTES_PROWESS]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.ATTRIBUTES_WILL]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.ATTRIBUTES_KNOWLEDGE]: [Validators.required, Validators.min(0)],
  [PlayerFormControls.ATTRIBUTES_LUCK]: [Validators.required, Validators.min(0)],
}
