import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-game-session-header-item',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './game-session-header-item.component.html',
  styleUrl: './game-session-header-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionHeaderItemComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
}
