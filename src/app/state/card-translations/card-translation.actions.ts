import { CardTranslation } from '@Models/card-translation.model';
import { createAction, props } from '@ngrx/store';
import { Language } from '@Features/language/_enums/language.enum';

const cardsPageKey = '[Cards Page]';
const cardTranslationsApiKey = '[Card Translations API]';

export const addCardTranslation = createAction(
  `${cardsPageKey} Add Card Translation`,
  props<{ cardId: number; cardTranslation: CardTranslation }>(),
);
export const addCardTranslationSuccess = createAction(
  `${cardTranslationsApiKey} Add Card Translation Success`,
  props<{ cardTranslation: CardTranslation }>(),
);
export const addCardTranslationFailure = createAction(
  `${cardTranslationsApiKey} Add Card Translation Failure`,
  props<{ error: string }>(),
);

export const updateCardTranslation = createAction(
  `${cardsPageKey} Update Card Translation`,
  props<{ cardId: number; cardTranslation: CardTranslation }>(),
);
export const updateCardTranslationSuccess = createAction(
  `${cardTranslationsApiKey} Update Card Translation Success`,
  props<{ cardTranslation: CardTranslation }>(),
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
  props<{ locale: Language }>(),
);
export const removeCardTranslationFailure = createAction(
  `${cardTranslationsApiKey} Remove Card Translation Failure`,
  props<{ error: string }>(),
);

export const loadCardTranslations = createAction(`${cardsPageKey} Load Card Translations`);
export const loadCardTranslationsSuccess = createAction(
  `${cardTranslationsApiKey} Load Card Translations Success`,
  props<{ cardId: number; cardTranslations: CardTranslation[] }>(),
);
export const loadCardTranslationsFailure = createAction(
  `${cardTranslationsApiKey} Load Card Translations Failure`,
  props<{ error: string }>(),
);
