import { Validators } from '@angular/forms';
import { GameSessionJoinFormControls } from '@Enums/form-controls/game-session-join-form-controls.enum';
import { REGEX_CONFIG } from '@Configs/regex.config';

export const GAME_SESSION_JOIN_FORM_VALIDATORS = {
  [GameSessionJoinFormControls.TOKEN]: [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(REGEX_CONFIG.gameSessionTokenRegex),
  ],
};
