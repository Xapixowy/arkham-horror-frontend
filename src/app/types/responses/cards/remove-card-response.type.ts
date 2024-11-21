import {CardDto} from '@Types/dtos/card-dto.type';

export type RemoveCardResponse = Omit<CardDto, 'id'>;
