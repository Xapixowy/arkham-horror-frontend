import {StateStatus} from '@Enums/state-status.enum';
import {Character} from '@Models/character.model';

export type CharacterState = {
  characters: Character[];
  error: string | null;
  status: StateStatus;
};
