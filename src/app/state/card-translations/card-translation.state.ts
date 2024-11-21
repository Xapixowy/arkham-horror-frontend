import { StateStatus } from '@Enums/state-status.enum';
import { CardTranslation } from '@Models/card-translation.model';

export type CardTranslationState = {
  cardTranslations: CardTranslation[];
  error: string | null;
  status: StateStatus;
};
