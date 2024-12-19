import { GameSimpleFormControlConfig } from '@Layouts/game-layout/_types/game-simple-form-control-config.type';
import { GameEquipmentFormControls } from '@Enums/form-controls/game-equipment-form-controls.enum';

export const EQUIPMENT_PAGE_CONFIG: {
  [GameEquipmentFormControls.MONEY]: GameSimpleFormControlConfig;
  [GameEquipmentFormControls.CLUES]: GameSimpleFormControlConfig;
  inputIdPrefix: string;
  updatePlayerDebounceTime: number;
} = {
  [GameEquipmentFormControls.MONEY]: {
    min: 0,
    max: 99,
  },
  [GameEquipmentFormControls.CLUES]: {
    min: 0,
    max: 99,
  },
  inputIdPrefix: 'game-equipment',
  updatePlayerDebounceTime: 300,
};
