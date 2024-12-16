import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerPlus, tablerX } from '@ng-icons/tabler-icons';
import { SpeedDialItem } from '@Components/speed-dial/_types/speed-dial-item.type';
import { TooltipModule } from 'primeng/tooltip';
import { NgClass } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-speed-dial',
  standalone: true,
  imports: [NgIcon, TooltipModule, NgClass, TranslocoPipe],
  providers: [
    provideIcons({
      tablerX,
      tablerPlus,
    }),
  ],
  templateUrl: './speed-dial.component.html',
  styleUrl: './speed-dial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedDialComponent {
  readonly icon = input<string>('tablerPlus');
  readonly items = input.required<SpeedDialItem[]>();

  protected readonly itemsToShow = computed<SpeedDialItem[]>(() => this.items().filter((item) => !item.hide));

  protected readonly isOpened = signal<boolean>(false);

  onButtonClick(): void {
    this.isOpened.set(!this.isOpened());
  }

  onItemClick(action: () => void): void {
    this.isOpened.set(false);
    action();
  }
}
