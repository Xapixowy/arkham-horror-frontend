import {CardAttributeModifier} from '@Enums/cards/card-attribute-modifier.enum';
import {CardAttributeAbility} from '@Enums/cards/card-attribute-ability.enum';
import {CardAttributeRestriction} from '@Enums/cards/card-attribute-restriction.enum';

export type AttributeModifier = {
  modifier: CardAttributeModifier | CardAttributeAbility | CardAttributeRestriction;
  value: number;
};
