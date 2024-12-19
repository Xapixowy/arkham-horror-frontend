import { PlayerDto } from '@Types/dtos/player-dto.type';

export type PlayerJoinedResponse = {
  game_session_token: string;
  player: PlayerDto;
};
