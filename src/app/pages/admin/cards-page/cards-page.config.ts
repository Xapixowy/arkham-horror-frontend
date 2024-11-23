import {getEnumValues} from 'ts-enum-helpers';
import {CardAttributeAbility} from '@Enums/cards/card-attribute-ability.enum';
import {CardAttributeRestriction} from '@Enums/cards/card-attribute-restriction.enum';
import {CardAttributeModifier} from '@Enums/cards/card-attribute-modifier.enum';

export const CARDS_PAGE_CONFIG: {
  placeholderImageSize: string;
  allowedCardImageFormats: string[];
  maxCardImageFileSize: number;
  attributeModifiersSelectOptions: {
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  handOptions: number[];
} = {
  placeholderImageSize: '6rem',
  allowedCardImageFormats: ['.jpg', '.png'],
  maxCardImageFileSize: 5 * 1024 * 1024,
  attributeModifiersSelectOptions: [
    {
      label: '_CardsPage.Abilities',
      options: getEnumValues(CardAttributeAbility).map((attribute) => ({
        label: `_CardAttributeAbility.${attribute}`,
        value: '' + attribute,
      })),
    },
    {
      label: '_CardsPage.Restrictions',
      options: getEnumValues(CardAttributeRestriction).map((attribute) => ({
        label: `_CardAttributeRestriction.${attribute}`,
        value: '' + attribute,
      })),
    },
    {
      label: '_CardsPage.Modifiers',
      options: getEnumValues(CardAttributeModifier).map((attribute) => ({
        label: `_CardAttributeModifier.${attribute}`,
        value: '' + attribute,
      })),
    },
  ],
  handOptions: [1, 2],
};
