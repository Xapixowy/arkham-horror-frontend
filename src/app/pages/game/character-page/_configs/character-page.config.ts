import { GameCharacterFormControls } from '@Enums/form-controls/game-character-form-controls.enum';
import { GameSimpleFormControlConfig } from '@Layouts/game-layout/_types/game-simple-form-control-config.type';

export const CHARACTER_PAGE_CONFIG: {
  [GameCharacterFormControls.SANITY]: GameSimpleFormControlConfig;
  [GameCharacterFormControls.ENDURANCE]: GameSimpleFormControlConfig;
  inputIdPrefix: string;
  updatePlayerDebounceTime: number;
} = {
  [GameCharacterFormControls.SANITY]: {
    min: 0,
    max: 99,
  },
  [GameCharacterFormControls.ENDURANCE]: {
    min: 0,
    max: 99,
  },
  inputIdPrefix: 'game-character',
  updatePlayerDebounceTime: 300,
};
