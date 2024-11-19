import {CardType} from '@Enums/cards/card-type.enum';
import {CardSubtype} from '@Enums/cards/card-subtype.enum';
import {AttributeModifier} from '@Types/cards/attribute-modifier.type';
import {Language} from '@Features/language/_enums/language.enum';
import {CardDto} from '@Types/dtos/card-dto.type';

export class Card {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public type: CardType,
    public subtype: CardSubtype | null,
    public attributeModifiers: AttributeModifier[] | null,
    public handUsage: number | null,
    public front_image_path: string | null,
    public back_image_path: string | null,
    public locale: Language,
    public created_at: Date,
    public update_at: Date,
  ) {
  }

  static fromDto(dto: CardDto): Card {
    return new Card(
      dto.id,
      dto.name,
      dto.description,
      dto.type,
      dto.subtype,
      dto.attributeModifiers,
      dto.handUsage,
      dto.front_image_path,
      dto.back_image_path,
      dto.locale,
      new Date(dto.created_at),
      new Date(dto.update_at),
    );
  }
}
