import { StateStatus } from '@Enums/state-status.enum';
import { GameSession } from '@Models/game-session.model';

export type GameSessionState = {
  gameSessions: GameSession[];
  error: string | null;
  status: StateStatus;
};
