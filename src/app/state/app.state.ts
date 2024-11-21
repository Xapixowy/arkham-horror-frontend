import { CardState } from '@State/cards/card.state';
import { CardTranslationState } from '@State/card-translations/card-translation.state';

export type AppState = {
  cards: CardState;
  cardTranslations: CardTranslationState;
};
