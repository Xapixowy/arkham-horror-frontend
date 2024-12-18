import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PlayerStatistics } from '@Types/players/player-statistics.enum';
import { tablerChartBar } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-game-session-statistics' + '',
  standalone: true,
  imports: [NgIcon, TranslocoPipe],
  providers: [
    provideIcons({
      tablerChartBar,
    }),
  ],
  templateUrl: './game-session-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionStatisticsComponent {
  readonly statistics = input.required<PlayerStatistics>();
}
