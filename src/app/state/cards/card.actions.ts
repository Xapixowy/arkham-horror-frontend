import {createAction, props} from '@ngrx/store';
import {Card} from '@Models/card.model';

const cardsPageKey = '[Cards Page]';
const cardsApiKey = '[Cards API]'

export const addCard = createAction(`${cardsPageKey} Add Card`, props<{
  card: Card,
  frontImage: File,
  backImage: File
}>());
export const addCardSuccess = createAction(
  `${cardsApiKey} Add Card Success`,
  props<{ card: Card }>()
);
export const addCardFailure = createAction(
  `${cardsApiKey} Add Card Failure`,
  props<{ error: string }>()
);

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

export const addCardFrontImage = createAction(
  `${cardsPageKey} Add Card Front Image`,
  props<{ id: number, file: File }>()
);
export const addCardFrontImageSuccess = createAction(
  `${cardsApiKey} Add Card Front Image Success`,
  props<{ card: Card }>()
);
export const addCardFrontImageFailure = createAction(
  `${cardsApiKey} Add Card Front Image Failure`,
  props<{ error: string }>()
);

export const addCardBackImage = createAction(
  `${cardsPageKey} Add Card Back Image`,
  props<{ id: number, file: File }>()
);
export const addCardBackImageSuccess = createAction(
  `${cardsApiKey} Add Card Back Image Success`,
  props<{ card: Card }>()
);
export const addCardBackImageFailure = createAction(
  `${cardsApiKey} Add Card Back Image Failure`,
  props<{ error: string }>()
);
