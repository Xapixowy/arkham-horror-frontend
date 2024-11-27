import { PlayerDto } from '@Types/dtos/player-dto.type';
import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';

export type GameSessionDto = {
  id: number;
  token: string;
  phase: GameSessionPhase;
  created_at: Date;
  updated_at: Date;
  players?: PlayerDto[];
};
