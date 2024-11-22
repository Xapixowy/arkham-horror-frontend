import {CardDto} from '@Types/dtos/card-dto.type';

export type CharacterCardDto = {
  id: number,
  quantity: number,
  card: CardDto,
};
