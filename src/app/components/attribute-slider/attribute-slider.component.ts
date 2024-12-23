import { ChangeDetectionStrategy, Component, computed, input, OnChanges, signal } from '@angular/core';
import { AttributeSliderConfig } from '@Components/attribute-slider/_types/attribute-slider-config.type';
import { SliderModule, SliderSlideEndEvent } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-attribute-slider',
  standalone: true,
  imports: [SliderModule, FormsModule, TranslocoPipe],
  templateUrl: './attribute-slider.component.html',
  styleUrl: './attribute-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeSliderComponent implements OnChanges {
  readonly config = input.required<AttributeSliderConfig>();
  readonly noLabels = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  protected readonly sliderValue = signal<number>(0);

  protected readonly maxValue = computed<number>(() => this.config().firstAttribute.values.length - 1);

  protected readonly minValue = 0;

  ngOnChanges(): void {
    this.initializeSliderValue();
    this.setFormControlValues(this.sliderValue());
  }

  onSlideEnd(event: SliderSlideEndEvent): void {
    this.setFormControlValues(event.value as number);
  }

  private setFormControlValues(value: number): void {
    const firstAttributeValue = this.config().firstAttribute.values[value];
    const secondAttributeValue = this.config().secondAttribute.values[value];
    if (firstAttributeValue) {
      this.config().firstAttribute.formControl.setValue(this.config().firstAttribute.values[value]);
    }
    if (secondAttributeValue) {
      this.config().secondAttribute.formControl.setValue(this.config().secondAttribute.values[value]);
    }
  }

  private initializeSliderValue(): void {
    const firstAttributeValueIndex = this.config().firstAttribute.values.indexOf(this.config().firstAttribute.value);
    const secondAttributeValueIndex = this.config().secondAttribute.values.indexOf(this.config().secondAttribute.value);
    if (firstAttributeValueIndex === secondAttributeValueIndex) {
      this.sliderValue.set(firstAttributeValueIndex);
    }
  }
}
