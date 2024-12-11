import { StateStatus } from '@Enums/state-status.enum';
import { GameSession } from '@Models/game-session.model';
import { UserStatistics } from '@Types/user/user-statistics.type';

export type DashboardState = {
  gameSessions: GameSession[];
  userStatistics: UserStatistics | null;
  error: string | null;
  status: StateStatus;
};
