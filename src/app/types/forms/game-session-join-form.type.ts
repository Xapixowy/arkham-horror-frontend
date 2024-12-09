import { FormControl } from '@angular/forms';
import { GameSessionJoinFormControls } from '@Enums/form-controls/game-session-join-form-controls.enum';

export type GameSessionJoinForm = {
  [GameSessionJoinFormControls.TOKEN]: FormControl<string | null>;
};
