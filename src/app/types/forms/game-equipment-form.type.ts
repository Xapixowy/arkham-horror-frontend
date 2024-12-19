import { FormControl } from '@angular/forms';
import { GameEquipmentFormControls } from '@Enums/form-controls/game-equipment-form-controls.enum';

export type GameEquipmentForm = {
  [GameEquipmentFormControls.MONEY]: FormControl<number | null>;
  [GameEquipmentFormControls.CLUES]: FormControl<number | null>;
};
