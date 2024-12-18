import { StatisticsSeparated } from '@Types/statistics-separated.type';

export type StatisticsGroup = {
  icon: string;
  label: string;
  statistics: StatisticsSeparated[];
};
