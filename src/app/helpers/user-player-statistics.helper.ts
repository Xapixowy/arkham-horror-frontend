import { UserStatistics } from '@Types/user/user-statistics.type';
import { getEnumNames } from 'ts-enum-helpers';
import { PlayerStatistics } from '@Types/players/player-statistics.enum';
import { StatisticGroup } from '@Enums/statistic-group.enum';
import { StatisticsGroup } from '@Types/statistics-group.type';
import { StatisticsSeparated } from '@Types/statistics-separated.type';

export class UserPlayerStatisticsHelper {
  static generateStatisticGroups(statistics: UserStatistics | PlayerStatistics): StatisticsGroup[] {
    const groups = [
      ...getEnumNames(StatisticGroup)
        .filter((group) => isNaN(parseInt(group)))
        .map((group) => group.toLowerCase()),
    ];
    const statisticsLeft = { ...statistics };
    const statisticsGroups: StatisticsGroup[] = [];

    groups.forEach((label) => {
      statisticsGroups.push({
        icon: UserPlayerStatisticsHelper.getIconForStatisticGroup(
          StatisticGroup[label.toUpperCase() as keyof typeof StatisticGroup],
        ),
        label: label[0].toUpperCase() + label.slice(1).replaceAll('_', ' '),
        statistics: UserPlayerStatisticsHelper.generateStatisticsSeparatedForLabel(label, statisticsLeft),
      });
    });

    statisticsGroups.push({
      icon: UserPlayerStatisticsHelper.getIconForStatisticGroup(),
      label: 'Other',
      statistics: UserPlayerStatisticsHelper.generateStatisticsSeparatedForLabel(null, statisticsLeft),
    });

    return statisticsGroups.filter((group) => group.statistics.length > 0);
  }

  static generateStatisticsSeparatedForLabel(
    label: string | null,
    statistics: UserStatistics | PlayerStatistics,
  ): StatisticsSeparated[] {
    const separatedStatistics: StatisticsSeparated[] = [];

    Object.entries(statistics).forEach(([key, value]) => {
      if (label === null) {
        separatedStatistics.push({ label: key, value });
        delete statistics[key as keyof (UserStatistics | PlayerStatistics)];
        return;
      }

      if (key.toLowerCase().includes(label)) {
        separatedStatistics.push({ label: key, value });
        delete statistics[key as keyof (UserStatistics | PlayerStatistics)];
      }
    });

    return separatedStatistics;
  }

  static getIconForStatisticGroup(group?: StatisticGroup): string {
    switch (group) {
      case StatisticGroup.MONEY:
        return 'tablerCoin';
      case StatisticGroup.CLUES:
        return 'tablerZoom';
      case StatisticGroup.ENDURANCE:
        return 'tablerHeart';
      case StatisticGroup.SANITY:
        return 'tablerBrain';
      case StatisticGroup.CARDS:
        return 'tablerCards';
      case StatisticGroup.GAME_SESSION:
        return 'tablerDeviceGamepad';
      default:
        return 'tablerQuestionMark';
    }
  }
}
