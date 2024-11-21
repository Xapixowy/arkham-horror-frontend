import { AppState } from '@State/app.state';
import { createSelector } from '@ngrx/store';

export const selectCardTranslationState = (state: AppState) => state.cardTranslations;

export const selectCardTranslations = createSelector(
  selectCardTranslationState,
  (cardTranslations) => cardTranslations.cardTranslations,
);

export const selectCardTranslationsLoading = createSelector(
  selectCardTranslationState,
  (cardTranslations) => cardTranslations.status,
);

export const selectCardTranslationsError = createSelector(
  selectCardTranslationState,
  (cardTranslations) => cardTranslations.error,
);
