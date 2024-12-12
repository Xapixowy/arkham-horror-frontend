import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '@Pages/dashboard/statistics-page/statistics-page.service';
import { StateStatus } from '@Enums/state-status.enum';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslocoPipe } from '@jsverse/transloco';
import { UserStatisticsGroup } from '@Pages/dashboard/statistics-page/_types/user-statistics-group.type';
import { UserStatistics } from '@Types/user/user-statistics.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { UserStatisticGroup } from '@Pages/dashboard/statistics-page/_enums/user-statistic-group.enum';
import { UserStatisticsSeparated } from '@Pages/dashboard/statistics-page/_types/user-statistics-separated.type';
import { getEnumNames } from 'ts-enum-helpers';
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

  protected readonly userStatisticsGroups = computed<UserStatisticsGroup[]>(() => {
    if (!this.userStatistics()) {
      return [];
    }

    return this.generateUserStatisticGroups(this.userStatistics()!);
  });

  private generateUserStatisticGroups(userStatistics: UserStatistics): UserStatisticsGroup[] {
    const groups = [
      ...getEnumNames(UserStatisticGroup)
        .filter((group) => isNaN(parseInt(group)))
        .map((group) => group.toLowerCase()),
    ];
    const userStatisticsLeft = { ...userStatistics };
    const userStatisticsGroups: UserStatisticsGroup[] = [];

    groups.forEach((label) => {
      userStatisticsGroups.push({
        icon: this.getIconForUserStatisticGroup(
          UserStatisticGroup[label.toUpperCase() as keyof typeof UserStatisticGroup],
        ),
        label: label[0].toUpperCase() + label.slice(1).replaceAll('_', ' '),
        statistics: this.generateUserStatisticsSeparatedForLabel(label, userStatisticsLeft),
      });
    });

    userStatisticsGroups.push({
      icon: this.getIconForUserStatisticGroup(),
      label: 'Other',
      statistics: this.generateUserStatisticsSeparatedForLabel(null, userStatisticsLeft),
    });

    return userStatisticsGroups;
  }

  private generateUserStatisticsSeparatedForLabel(
    label: string | null,
    userStatistics: UserStatistics,
  ): UserStatisticsSeparated[] {
    const statistics: UserStatisticsSeparated[] = [];

    Object.entries(userStatistics).forEach(([key, value]) => {
      if (label === null) {
        statistics.push({ label: key, value });
        delete userStatistics[key as keyof UserStatistics];
        return;
      }

      if (key.toLowerCase().includes(label)) {
        statistics.push({ label: key, value });
        delete userStatistics[key as keyof UserStatistics];
      }
    });

    return statistics;
  }

  private getIconForUserStatisticGroup(group?: UserStatisticGroup): string {
    switch (group) {
      case UserStatisticGroup.MONEY:
        return 'tablerCoin';
      case UserStatisticGroup.CLUES:
        return 'tablerZoom';
      case UserStatisticGroup.ENDURANCE:
        return 'tablerHeart';
      case UserStatisticGroup.SANITY:
        return 'tablerBrain';
      case UserStatisticGroup.CARDS:
        return 'tablerCards';
      case UserStatisticGroup.GAME_SESSION:
        return 'tablerDeviceGamepad';
      default:
        return 'tablerQuestionMark';
    }
  }
}
