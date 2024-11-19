import {AppState} from '@State/app.state';
import {createSelector} from '@ngrx/store';

export const selectCardState = (state: AppState) => state.cards;

export const selectCards = createSelector(
  selectCardState,
  (cards) => cards.cards
);

export const selectLoading = createSelector(
  selectCardState,
  (state) => state.status
);

export const selectError = createSelector(
  selectCardState,
  (state) => state.error
);
