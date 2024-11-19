import {CardType} from '@Enums/cards/card-type.enum';
import {CardSubtype} from '@Enums/cards/card-subtype.enum';
import {AttributeModifier} from '@Types/cards/attribute-modifier.type';
import {Language} from '@Features/language/_enums/language.enum';

export type CardDto = {
  id: number,
  name: string,
  description: string,
  type: CardType,
  subtype: CardSubtype | null,
  attributeModifiers: AttributeModifier[] | null,
  handUsage: number | null,
  front_image_path: string | null,
  back_image_path: string | null,
  locale: Language,
  created_at: string,
  update_at: string,
}
