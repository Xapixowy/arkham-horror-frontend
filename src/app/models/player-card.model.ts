import { Card } from '@Models/card.model';
import { PlayerCardDto } from '@Types/dtos/player-card-dto.type';

export class PlayerCard {
  constructor(
    public id: number,
    public quantity: number,
    public card?: Card,
  ) {}

  static fromDto(dto: PlayerCardDto): PlayerCard {
    return new PlayerCard(dto.id, dto.quantity, Card.fromDto(dto.card));
  }
}
