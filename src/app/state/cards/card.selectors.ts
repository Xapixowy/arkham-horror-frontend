import { AppState } from '@State/app.state';
import { createSelector } from '@ngrx/store';

export const selectCardState = (state: AppState) => state.cards;

export const selectCards = createSelector(selectCardState, (cards) => cards.cards);

export const selectCardsLoading = createSelector(selectCardState, (state) => state.status);

export const selectCardsError = createSelector(selectCardState, (state) => state.error);
