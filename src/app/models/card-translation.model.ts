import { Language } from '@Features/language/_enums/language.enum';
import { CardTranslationDto } from '@Types/dtos/card-translation-dto.type';

export class CardTranslation {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public locale: Language,
    public created_at: Date,
    public update_at: Date,
  ) {}

  static fromDto(dto: CardTranslationDto): CardTranslation {
    return new CardTranslation(
      dto.id,
      dto.name,
      dto.description,
      dto.locale,
      new Date(dto.created_at),
      new Date(dto.update_at),
    );
  }
}
