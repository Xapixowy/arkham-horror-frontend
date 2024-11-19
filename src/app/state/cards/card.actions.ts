import {createAction, props} from '@ngrx/store';
import {Card} from '@Models/card.model';

const cardsPageKey = '[Cards Page]';
const cardsApiKey = '[Cards API]'

export const removeCard = createAction(`${cardsPageKey} Remove Card`, props<{ id: number }>());
export const removeCardSuccess = createAction(
  `${cardsApiKey} Remove Card Success`,
  props<{ id: number }>()
);
export const removeCardFailure = createAction(
  `${cardsApiKey} Remove Card Failure`,
  props<{ error: string }>()
);

export const loadCards = createAction(`${cardsPageKey} Load Cards`);
export const loadCardsSuccess = createAction(
  `${cardsApiKey} Load Cards Success`,
  props<{ cards: Card[] }>()
);
export const loadCardsFailure = createAction(
  `${cardsApiKey} Load Cards Failure`,
  props<{ error: string }>()
);
