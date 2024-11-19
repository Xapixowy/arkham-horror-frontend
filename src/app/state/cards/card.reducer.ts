import {createReducer, on} from '@ngrx/store';
import {
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  removeCard,
  removeCardFailure,
  removeCardSuccess
} from './card.actions';
import {StateStatus} from '@Enums/state-status.enum';
import {Card} from '@Models/card.model';

export type CardState = {
  cards: Card[];
  error: string | null;
  status: StateStatus
}

export const cardInitialState: CardState = {
  cards: [],
  error: null,
  status: StateStatus.PENDING
};

export const cardReducer = createReducer(
  cardInitialState,
  on(removeCard, (state) => ({...state, status: StateStatus.LOADING})),
  on(removeCardSuccess, (state, {id}) => ({
    ...state,
    cards: state.cards.filter(card => card.id !== id),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeCardFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadCards, (state) => ({...state, status: StateStatus.LOADING})),
  on(loadCardsSuccess, (state, {cards}) => ({
    ...state,
    cards,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadCardsFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  }))
);
