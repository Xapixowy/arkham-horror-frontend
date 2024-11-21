import { createReducer, on } from '@ngrx/store';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess,
  updateCard,
  updateCardFailure,
  updateCardSuccess,
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
);
