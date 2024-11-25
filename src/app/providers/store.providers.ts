import {cardReducer} from '@States/cards/card.reducer';
import {characterReducer} from '@States/characters/character.reducer';

export const STORE_PROVIDERS = {
  cards: cardReducer,
  characters: characterReducer,
};
