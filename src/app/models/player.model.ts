import { PlayerRole } from '@Enums/players/player-role.enum';
import { Status } from '@Types/players/player-status.enum';
import { Equipment } from '@Types/players/player-equipment.type';
import { Attributes } from '@Types/players/player-attributes.type';
import { Statistics } from '@Types/players/player-statistics.enum';
import { User } from '@Models/user.model';
import { Character } from '@Models/character.model';
import { PlayerCard } from '@Models/player-card.model';
import { PlayerDto } from '@Types/dtos/player-dto.type';
import { GameSession } from '@Models/game-session.model';

export class Player {
  constructor(
    public id: number,
    public token: string,
    public role: PlayerRole,
    public status: Status,
    public equipment: Equipment,
    public attributes: Attributes,
    public statistics: Statistics,
    public created_at: Date,
    public updated_at: Date,
    public user?: User,
    public character?: Character,
    public playerCards?: PlayerCard[],
    public game_session?: GameSession,
  ) {}

  static fromDto(dto: PlayerDto): Player {
    return new Player(
      dto.id,
      dto.token,
      dto.role,
      dto.status,
      dto.equipment,
      dto.attributes,
      dto.statistics,
      dto.created_at,
      dto.updated_at,
      dto.user,
      dto.character ? Character.fromDto(dto.character) : undefined,
      dto.playerCards ? dto.playerCards.map((playerCard) => PlayerCard.fromDto(playerCard)) : undefined,
      dto.game_session ? GameSession.fromDto(dto.game_session) : undefined,
    );
  }
}
