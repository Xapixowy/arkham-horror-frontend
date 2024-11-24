import {cardReducer} from '@State/cards/card.reducer';
import {characterReducer} from '@State/characters/character.reducer';

export const STORE_PROVIDERS = {
  cards: cardReducer,
  characters: characterReducer,
};
