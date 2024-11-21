import { CardType } from '@Enums/cards/card-type.enum';
import { CardSubtype } from '@Enums/cards/card-subtype.enum';
import { AttributeModifier } from '@Types/cards/attribute-modifier.type';

export type UpdateCardPayload = {
  name: string | null;
  description: string | null;
  type: CardType | null;
  subtype: CardSubtype | null;
  attribute_modifiers: AttributeModifier[] | null;
  hand_usage: number | null;
};
