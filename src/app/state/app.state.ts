import {CardState} from '@State/cards/card.state';
import {CharacterState} from '@State/characters/character.state';

export type AppState = {
  cards: CardState;
  characters: CharacterState;
};
