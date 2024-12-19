import { PlayerDto } from '@Types/dtos/player-dto.type';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

export type GameSessionJoinResponse = {
  game_session: GameSessionDto;
  player: PlayerDto;
};
