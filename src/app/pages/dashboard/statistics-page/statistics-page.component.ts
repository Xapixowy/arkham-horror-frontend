import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '@Pages/dashboard/statistics-page/statistics-page.service';
import { StateStatus } from '@Enums/state-status.enum';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBrain,
  tablerCards,
  tablerCoin,
  tablerDeviceGamepad,
  tablerHeart,
  tablerQuestionMark,
  tablerZoom,
} from '@ng-icons/tabler-icons';
import { CardModule } from 'primeng/card';
import { UserPlayerStatisticsHelper } from '@Helpers/user-player-statistics.helper';
import { StatisticsGroup } from '@Types/statistics-group.type';

@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [NoContentComponent, SkeletonModule, TranslocoPipe, NgIcon, CardModule],
  providers: [
    StatisticsPageService,
    provideIcons({
      tablerCoin,
      tablerZoom,
      tablerHeart,
      tablerBrain,
      tablerCards,
      tablerDeviceGamepad,
      tablerQuestionMark,
    }),
  ],
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent {
  private readonly statisticsPageService = inject(StatisticsPageService);

  protected readonly userStatistics = this.statisticsPageService.userStatistics;
  protected readonly dashboardStatus = this.statisticsPageService.dashboardStatus;
  protected readonly StateStatus = StateStatus;

  protected readonly userStatisticsGroups = computed<StatisticsGroup[]>(() => {
    if (!this.userStatistics()) {
      return [];
    }

    return UserPlayerStatisticsHelper.generateStatisticGroups(this.userStatistics()!);
  });
}
