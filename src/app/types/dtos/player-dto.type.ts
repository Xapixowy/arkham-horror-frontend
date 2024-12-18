import { PlayerRole } from '@Enums/players/player-role.enum';
import { Status } from '@Types/players/player-status.enum';
import { Equipment } from '@Types/players/player-equipment.type';
import { Attributes } from '@Types/players/player-attributes.type';
import { PlayerStatistics } from '@Types/players/player-statistics.enum';
import { UserDto } from '@Types/dtos/user-dto.type';
import { CharacterDto } from '@Types/dtos/character-dto.type';
import { PlayerCardDto } from '@Types/dtos/player-card-dto.type';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

export type PlayerDto = {
  id: number;
  token: string;
  role: PlayerRole;
  status: Status;
  equipment: Equipment;
  attributes: Attributes;
  statistics: PlayerStatistics;
  created_at: Date;
  updated_at: Date;
  user?: UserDto;
  character?: CharacterDto;
  playerCards?: PlayerCardDto[];
  game_session?: GameSessionDto;
};
