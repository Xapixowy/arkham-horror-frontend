import { cardReducer } from '@State/cards/card.reducer';
import { cardTranslationReducer } from '@State/card-translations/card-translation.reducer';

export const STORE_PROVIDERS = {
  cards: cardReducer,
  cardTranslations: cardTranslationReducer,
};
