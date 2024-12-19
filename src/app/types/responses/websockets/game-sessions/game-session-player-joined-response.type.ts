import { PlayerDto } from '@Types/dtos/player-dto.type';

export type GameSessionPlayerJoinedResponse = {
  game_session_token: string;
  player: PlayerDto;
};
