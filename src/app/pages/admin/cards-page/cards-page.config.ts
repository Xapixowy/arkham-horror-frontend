import {getEnumValues} from 'ts-enum-helpers';
import {CardAttributeAbility} from '@Enums/cards/card-attribute-ability.enum';
import {CardAttributeRestriction} from '@Enums/cards/card-attribute-restriction.enum';
import {CardAttributeModifier} from '@Enums/cards/card-attribute-modifier.enum';

export const CARDS_PAGE_CONFIG: {
  placeholderImageUrl: string
  allowedCardImageFormats: string[]
  maxCardImageFileSize: number
  attributeModifiersSelectOptions: {
    label: string
    options: {
      name: string
      value: string
    }[]
  }[]
  handOptions: number[]
} = {
  placeholderImageUrl: 'https://placehold.co/240x360',
  allowedCardImageFormats: ['.jpg', '.png'],
  maxCardImageFileSize: 5 * 1024 * 1024,
  attributeModifiersSelectOptions: [
    {
      label: '_CardsPage.Abilities',
      options: getEnumValues(CardAttributeAbility).map(attribute => ({
        name: `_CardAttributeAbility.${attribute}`,
        value: '' + attribute
      }))
    },
    {
      label: '_CardsPage.Restrictions',
      options: getEnumValues(CardAttributeRestriction).map(attribute => ({
        name: `_CardAttributeRestriction.${attribute}`,
        value: '' + attribute
      }))
    },
    {
      label: '_CardsPage.Modifiers',
      options: getEnumValues(CardAttributeModifier).map(attribute => ({
        name: `_CardAttributeModifier.${attribute}`,
        value: '' + attribute
      }))
    }
  ],
  handOptions: [1, 2]
}
