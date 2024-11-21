import { FormControl } from '@angular/forms';
import { CardFormControls } from '@Enums/form-controls/card-form-controls.enum';
import { CardType } from '@Enums/cards/card-type.enum';
import { CardSubtype } from '@Enums/cards/card-subtype.enum';
import { AttributeModifier } from '@Types/cards/attribute-modifier.type';

export type CardForm = {
  [CardFormControls.ID]: FormControl<number | null>;
  [CardFormControls.NAME]: FormControl<string | null>;
  [CardFormControls.DESCRIPTION]: FormControl<string | null>;
  [CardFormControls.TYPE]: FormControl<CardType | null>;
  [CardFormControls.SUBTYPE]: FormControl<CardSubtype | null>;
  [CardFormControls.FRONT_IMAGE]: FormControl<File | null>;
  [CardFormControls.BACK_IMAGE]: FormControl<File | null>;
  [CardFormControls.ATTRIBUTE_MODIFIERS]: FormControl<AttributeModifier[] | null>;
  [CardFormControls.HAND_USAGE]: FormControl<number | null>;
};
