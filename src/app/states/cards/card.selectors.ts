import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';
import {Card} from '@Models/card.model';

export const selectCardState = (state: AppState) => state.cards;

export const selectCards = createSelector(selectCardState, (state) => state.cards);

export const selectCardStatus = createSelector(selectCardState, (state) => state.status);

export const selectCardError = createSelector(selectCardState, (state) => state.error);

export const selectCardTranslations = (cardId: number) =>
  createSelector(selectCardState, (state) => state.cards.find((card: Card) => card.id === cardId)?.translations ?? []);
