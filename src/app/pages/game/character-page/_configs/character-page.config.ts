import { GameCharacterFormControls } from '@Enums/form-controls/game-character-form-controls.enum';
import { GameCharacterFormControlConfig } from '@Pages/game/character-page/_types/game-character-form-control-config.type';

export const CHARACTER_PAGE_CONFIG: {
  [GameCharacterFormControls.SANITY]: GameCharacterFormControlConfig;
  [GameCharacterFormControls.ENDURANCE]: GameCharacterFormControlConfig;
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
