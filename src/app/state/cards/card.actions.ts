import {createAction, props} from '@ngrx/store';
import {Card} from '@Models/card.model';
import {CardTranslation} from '@Models/card-translation.model';
import {Language} from '@Features/language/_enums/language.enum';
import {AddCardPayload} from '@Types/payloads/cards/add-card-payload.type';
import {AddCardTranslationPayload} from '@Types/payloads/card-translations/add-card-translation-payload.type';
import {UpdateCardTranslationPayload} from '@Types/payloads/card-translations/update-card-translation-payload.type';
import {UpdateCardPayload} from '@Types/payloads/cards/update-card-payload.type';

const cardsPageKey = '[Cards Page]';
const cardsApiKey = '[Cards API]';
const cardTranslationsApiKey = '[Card Translations API]';

export const addCard = createAction(
  `${cardsPageKey} Add Card`,
  props<{
    payload: AddCardPayload;
    frontImage: File;
    backImage: File;
  }>(),
);
export const addCardSuccess = createAction(`${cardsApiKey} Add Card Success`, props<{ card: Card }>());
export const addCardFailure = createAction(`${cardsApiKey} Add Card Failure`, props<{ error: string }>());

export const updateCard = createAction(
  `${cardsPageKey} Update Card`,
  props<{
    cardId: number,
    payload: UpdateCardPayload;
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

export const addCardTranslation = createAction(
  `${cardsPageKey} Add Card Translation`,
  props<{
    cardId: number;
    payload: AddCardTranslationPayload
  }>(),
);
export const addCardTranslationSuccess = createAction(
  `${cardTranslationsApiKey} Add Card Translation Success`,
  props<{ cardId: number; cardTranslation: CardTranslation }>(),
);
export const addCardTranslationFailure = createAction(
  `${cardTranslationsApiKey} Add Card Translation Failure`,
  props<{ error: string }>(),
);

export const updateCardTranslation = createAction(
  `${cardsPageKey} Update Card Translation`,
  props<{
    cardId: number;
    locale: Language;
    payload: UpdateCardTranslationPayload
  }>(),
);
export const updateCardTranslationSuccess = createAction(
  `${cardTranslationsApiKey} Update Card Translation Success`,
  props<{ cardId: number; cardTranslation: CardTranslation }>(),
);
export const updateCardTranslationFailure = createAction(
  `${cardTranslationsApiKey} Update Card Translation Failure`,
  props<{ error: string }>(),
);

export const removeCardTranslation = createAction(
  `${cardsPageKey} Remove Card Translation`,
  props<{ cardId: number; locale: Language }>(),
);
export const removeCardTranslationSuccess = createAction(
  `${cardTranslationsApiKey} Remove Card Translation Success`,
  props<{ cardId: number; locale: Language }>(),
);
export const removeCardTranslationFailure = createAction(
  `${cardTranslationsApiKey} Remove Card Translation Failure`,
  props<{ error: string }>(),
);

export const loadCardTranslations = createAction(`${cardsPageKey} Load Card Translations`, props<{ cardId: number }>());
export const loadCardTranslationsSuccess = createAction(
  `${cardTranslationsApiKey} Load Card Translations Success`,
  props<{ cardId: number; cardTranslations: CardTranslation[] }>(),
);
export const loadCardTranslationsFailure = createAction(
  `${cardTranslationsApiKey} Load Card Translations Failure`,
  props<{ error: string }>(),
);
