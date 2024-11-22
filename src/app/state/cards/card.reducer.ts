import { createReducer, on } from '@ngrx/store';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  addCardTranslation,
  addCardTranslationFailure,
  addCardTranslationSuccess,
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  loadCardTranslations,
  loadCardTranslationsFailure,
  loadCardTranslationsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess,
  removeCardTranslation,
  removeCardTranslationFailure,
  removeCardTranslationSuccess,
  updateCard,
  updateCardFailure,
  updateCardSuccess,
  updateCardTranslation,
  updateCardTranslationFailure,
  updateCardTranslationSuccess,
} from './card.actions';
import { StateStatus } from '@Enums/state-status.enum';
import { CardState } from '@State/cards/card.state';

export const cardInitialState: CardState = {
  cards: [],
  error: null,
  status: StateStatus.PENDING,
};

export const cardReducer = createReducer(
  cardInitialState,
  on(addCard, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(addCardSuccess, (state, { card }) => ({
    ...state,
    cards: [...state.cards, card],
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(addCardFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(updateCard, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(updateCardSuccess, (state, { card }) => ({
    ...state,
    cards: state.cards.map((c) => (c.id === card.id ? card : c)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(updateCardFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(removeCard, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(removeCardSuccess, (state, { id }) => ({
    ...state,
    cards: state.cards.filter((card) => card.id !== id),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeCardFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadCards, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadCardsFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(addCardTranslation, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(addCardTranslationSuccess, (state, { cardId, cardTranslation }) => ({
    ...state,
    cards: state.cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            translations: [...(c.translations ?? []), cardTranslation],
          }
        : c,
    ),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(addCardTranslationFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(updateCardTranslation, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(updateCardTranslationSuccess, (state, { cardId, cardTranslation }) => ({
    ...state,
    cards: state.cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            translations: (c.translations ?? []).map((t) => (t.id === cardTranslation.id ? cardTranslation : t)),
          }
        : c,
    ),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(updateCardTranslationFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(removeCardTranslation, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(removeCardTranslationSuccess, (state, { cardId, locale }) => ({
    ...state,
    cards: state.cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            translations: c.translations?.filter((t) => t.locale !== locale),
          }
        : c,
    ),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeCardTranslationFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadCardTranslations, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadCardTranslationsSuccess, (state, { cardId, cardTranslations }) => ({
    ...state,
    cards: state.cards.map((c) => (c.id === cardId ? { ...c, translations: cardTranslations } : c)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadCardTranslationsFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
);
