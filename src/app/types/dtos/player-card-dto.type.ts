import { CardDto } from '@Types/dtos/card-dto.type';

export type PlayerCardDto = {
  id: number;
  quantity: number;
  card: CardDto;
};
