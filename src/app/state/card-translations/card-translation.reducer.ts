import { CardTranslationState } from '@State/card-translations/card-translation.state';
import { StateStatus } from '@Enums/state-status.enum';
import { createReducer, on } from '@ngrx/store';
import {
  addCardTranslation,
  addCardTranslationFailure,
  addCardTranslationSuccess,
  loadCardTranslations,
  loadCardTranslationsFailure,
  loadCardTranslationsSuccess,
  removeCardTranslation,
  removeCardTranslationFailure,
  removeCardTranslationSuccess,
  updateCardTranslation,
  updateCardTranslationFailure,
  updateCardTranslationSuccess,
} from '@State/card-translations/card-translation.actions';

export const cardTranslationInitialState: CardTranslationState = {
  cardTranslations: [],
  error: null,
  status: StateStatus.PENDING,
};

export const cardTranslationReducer = createReducer(
  cardTranslationInitialState,
  on(addCardTranslation, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(addCardTranslationSuccess, (state, { cardTranslation }) => ({
    ...state,
    cardTranslations: [...state.cardTranslations, cardTranslation],
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(addCardTranslationFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(updateCardTranslation, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(updateCardTranslationSuccess, (state, { cardTranslation }) => ({
    ...state,
    cardTranslations: state.cardTranslations.map((c) => (c.id === cardTranslation.id ? cardTranslation : c)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(updateCardTranslationFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(removeCardTranslation, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(removeCardTranslationSuccess, (state, { locale }) => ({
    ...state,
    cardTranslations: state.cardTranslations.filter((cardTranslation) => cardTranslation.locale !== locale),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeCardTranslationFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadCardTranslations, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadCardTranslationsSuccess, (state, { cardTranslations }) => ({
    ...state,
    cardTranslations,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadCardTranslationsFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
);
