import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgIcon } from '@ng-icons/core';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { PrimeTemplate } from 'primeng/api';
import { TranslocoPipe } from '@jsverse/transloco';
import { StatisticsGroup } from '@Types/statistics-group.type';
import { UserPlayerStatisticsHelper } from '@Helpers/user-player-statistics.helper';
import { Player } from '@Models/player.model';

@Component({
  selector: 'app-player-statistics-dialog',
  standalone: true,
  imports: [CardModule, DialogModule, NgIcon, NoContentComponent, PrimeTemplate, TranslocoPipe],
  templateUrl: './player-statistics-dialog.component.html',
  styleUrl: './player-statistics-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatisticsDialogComponent {
  readonly visible = input.required<boolean>();
  readonly player = input.required<Player | null>();

  readonly onHide = output<void>();

  protected readonly statisticsGroups = computed<StatisticsGroup[]>(() =>
    this.player() ? UserPlayerStatisticsHelper.generateStatisticGroups(this.player()!.statistics) : [],
  );

  protected hideHandler(): void {
    this.onHide.emit();
  }
}
