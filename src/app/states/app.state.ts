import {CardState} from './cards/card.state';
import {CharacterState} from './characters/character.state';

export type AppState = {
  cards: CardState;
  characters: CharacterState;
};
