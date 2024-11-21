import {createReducer, on} from '@ngrx/store';
import {
  addCard,
  addCardBackImage,
  addCardBackImageFailure,
  addCardBackImageSuccess,
  addCardFailure,
  addCardFrontImage,
  addCardFrontImageFailure,
  addCardFrontImageSuccess,
  addCardSuccess,
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
  on(addCard, (state) => ({...state, status: StateStatus.LOADING})),
  on(addCardSuccess, (state, {card}) => ({
    ...state,
    cards: [...state.cards, card],
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(addCardFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
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
  })),
  on(addCardFrontImage, (state) => ({...state, status: StateStatus.LOADING})),
  on(addCardFrontImageSuccess, (state, {card}) => {
      const index = state.cards.findIndex(c => c.id === card.id);
      const cards = [...state.cards];
      cards[index] = {...card};

      return {
        ...state,
        cards,
        status: StateStatus.SUCCESS,
        error: null,
      }
    }
  ),
  on(addCardFrontImageFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(addCardBackImage, (state) => ({...state, status: StateStatus.LOADING})),
  on(addCardBackImageSuccess, (state, {card}) => {
    const index = state.cards.findIndex(c => c.id === card.id);
    const cards = [...state.cards];
    cards[index] = {...card};

    return {
      ...state,
      cards,
      status: StateStatus.SUCCESS,
      error: null,
    }
  }),
  on(addCardBackImageFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  }))
);
