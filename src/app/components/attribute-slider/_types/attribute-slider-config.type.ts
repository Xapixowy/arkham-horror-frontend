import {AbstractControl} from '@angular/forms';

export type AttributeSliderConfig = {
  firstAttribute: {
    label: string;
    formControl: AbstractControl;
    inputId: string;
    values: number[];
    value: number;
  },
  secondAttribute: {
    label: string;
    formControl: AbstractControl;
    inputId: string;
    values: number[];
    value: number;
  }
}
