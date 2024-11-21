import {FormControl} from '@angular/forms';
import {NewCardFormControls} from '@Enums/form-controls/new-card-form-controls.enum';
import {CardType} from '@Enums/cards/card-type.enum';
import {CardSubtype} from '@Enums/cards/card-subtype.enum';
import {AttributeModifier} from '@Types/cards/attribute-modifier.type';

export type NewCardForm = {
  [NewCardFormControls.NAME]: FormControl<string | null>;
  [NewCardFormControls.DESCRIPTION]: FormControl<string | null>;
  [NewCardFormControls.TYPE]: FormControl<CardType | null>;
  [NewCardFormControls.SUBTYPE]: FormControl<CardSubtype | null>;
  [NewCardFormControls.FRONT_IMAGE]: FormControl<File | null>;
  [NewCardFormControls.BACK_IMAGE]: FormControl<File | null>;
  [NewCardFormControls.ATTRIBUTE_MODIFIERS]: FormControl<AttributeModifier[] | null>;
  [NewCardFormControls.HAND_USAGE]: FormControl<number | null>;
};
