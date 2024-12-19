import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';
import { Player } from '@Models/player.model';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

export class GameSession {
  constructor(
    public id: number,
    public token: string,
    public phase: GameSessionPhase,
    public created_at: Date,
    public updated_at: Date,
    public players?: Player[],
  ) {}

  static fromDto(dto: GameSessionDto): GameSession {
    return new GameSession(
      dto.id,
      dto.token,
      dto.phase,
      new Date(dto.created_at),
      new Date(dto.updated_at),
      dto.players ? dto.players.map((player) => Player.fromDto(player)) : undefined,
    );
  }
}
