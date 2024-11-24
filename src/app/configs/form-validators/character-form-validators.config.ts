import {Validators} from '@angular/forms';
import {textInHtmlRequiredValidator} from '@Validators/text-in-html-required.validator';
import {CharacterFormControls} from '@Enums/form-controls/character-form-controls.enum';
import {arrayLength} from '@Validators/array-length.validator';

export const CHARACTER_FORM_VALIDATORS = {
  [CharacterFormControls.EXPANSION]: [Validators.required],
  [CharacterFormControls.NAME]: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
  [CharacterFormControls.DESCRIPTION]: [Validators.required, textInHtmlRequiredValidator()],
  [CharacterFormControls.PROFESSION]: [Validators.required, Validators.minLength(3), Validators.maxLength(64)],
  [CharacterFormControls.STARTING_LOCATION]: [Validators.required, Validators.minLength(3), Validators.maxLength(64)],
  [CharacterFormControls.SANITY]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.ENDURANCE]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.CONCENTRATION]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.SKILLS]: [Validators.required],
  [CharacterFormControls.ATTRIBUTES_SPEED]: [Validators.required, arrayLength(4)],
  [CharacterFormControls.ATTRIBUTES_SNEAK]: [Validators.required, arrayLength(4)],
  [CharacterFormControls.ATTRIBUTES_PROWESS]: [Validators.required, arrayLength(4)],
  [CharacterFormControls.ATTRIBUTES_WILL]: [Validators.required, arrayLength(4)],
  [CharacterFormControls.ATTRIBUTES_KNOWLEDGE]: [Validators.required, arrayLength(4)],
  [CharacterFormControls.ATTRIBUTES_LUCK]: [Validators.required, arrayLength(4)],
  [CharacterFormControls.EQUIPMENT_MONEY]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.EQUIPMENT_CLUES]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.EQUIPMENT_RANDOM_SPELLS]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES]: [Validators.required, Validators.min(0)],
  [CharacterFormControls.EQUIPMENT_RANDOM_ALLIES]: [Validators.required, Validators.min(0)],
};
