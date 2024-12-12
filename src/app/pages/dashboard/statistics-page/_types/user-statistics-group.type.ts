import { UserStatisticsSeparated } from '@Pages/dashboard/statistics-page/_types/user-statistics-separated.type';

export type UserStatisticsGroup = {
  icon: string;
  label: string;
  statistics: UserStatisticsSeparated[];
};
