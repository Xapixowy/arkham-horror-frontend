import { Card } from '@Models/card.model';
import { StateStatus } from '@Enums/state-status.enum';

export type CardState = {
  cards: Card[];
  error: string | null;
  status: StateStatus;
};
