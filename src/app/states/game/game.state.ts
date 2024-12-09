import { StateStatus } from '@Enums/state-status.enum';
import { GameSession } from '@Models/game-session.model';
import { Player } from '@Models/player.model';

export type GameState = {
  gameSession: GameSession | null;
  player: Player | null;
  error: string | null;
  status: StateStatus;
};
