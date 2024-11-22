import {CardType} from '@Enums/cards/card-type.enum';
import {CardSubtype} from '@Enums/cards/card-subtype.enum';
import {AttributeModifier} from '@Types/cards/attribute-modifier.type';

export type AddCardPayload = {
  name: string;
  description: string;
  type: CardType;
  subtype?: CardSubtype | null;
  attribute_modifiers?: AttributeModifier[] | null;
  hand_usage?: number | null;
};
