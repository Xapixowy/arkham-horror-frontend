import { createAction, props } from '@ngrx/store';
import { Card } from '@Models/card.model';

const cardsPageKey = '[Cards Page]';
const cardsApiKey = '[Cards API]';

export const addCard = createAction(
  `${cardsPageKey} Add Card`,
  props<{
    card: Card;
    frontImage: File;
    backImage: File;
  }>(),
);
export const addCardSuccess = createAction(`${cardsApiKey} Add Card Success`, props<{ card: Card }>());
export const addCardFailure = createAction(`${cardsApiKey} Add Card Failure`, props<{ error: string }>());

export const updateCard = createAction(
  `${cardsPageKey} Update Card`,
  props<{
    card: Card;
    frontImage: File;
    backImage: File;
  }>(),
);
export const updateCardSuccess = createAction(`${cardsApiKey} Update Card Success`, props<{ card: Card }>());
export const updateCardFailure = createAction(`${cardsApiKey} Update Card Failure`, props<{ error: string }>());

export const removeCard = createAction(`${cardsPageKey} Remove Card`, props<{ id: number }>());
export const removeCardSuccess = createAction(`${cardsApiKey} Remove Card Success`, props<{ id: number }>());
export const removeCardFailure = createAction(`${cardsApiKey} Remove Card Failure`, props<{ error: string }>());

export const loadCards = createAction(`${cardsPageKey} Load Cards`);
export const loadCardsSuccess = createAction(`${cardsApiKey} Load Cards Success`, props<{ cards: Card[] }>());
export const loadCardsFailure = createAction(`${cardsApiKey} Load Cards Failure`, props<{ error: string }>());
