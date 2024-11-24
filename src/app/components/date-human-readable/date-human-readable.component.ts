import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {DateHumanReadablePipe} from '@Pipes/date-human-readable.pipe';
import {TooltipModule} from 'primeng/tooltip';
import {format} from 'date-fns';
import {FORMATS_CONFIG} from '@Configs/formats.config';

@Component({
  selector: 'app-date-human-readable',
  standalone: true,
  imports: [
    DateHumanReadablePipe,
    TooltipModule
  ],
  templateUrl: './date-human-readable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateHumanReadableComponent {
  readonly date = input.required<Date>();
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('right');

  protected readonly fullDate = computed<string>(() => format(this.date(), FORMATS_CONFIG.fullDate));
}
