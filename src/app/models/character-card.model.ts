import {Card} from '@Models/card.model';
import {CharacterCardDto} from '@Types/dtos/character-card-dto.type';

export class CharacterCard {
  constructor(
    public id: number,
    public quantity: number,
    public card?: Card,
  ) {
  }

  static fromDto(dto: CharacterCardDto): CharacterCard {
    return new CharacterCard(
      dto.id,
      dto.quantity,
      Card.fromDto(dto.card),
    );
  }
}
