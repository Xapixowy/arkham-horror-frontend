import { createAction, props } from '@ngrx/store';
import { GameSession } from '@Models/game-session.model';
import { UserStatistics } from '@Types/user/user-statistics.type';

const historyPageKey = '[History Page]';
const statisticsPageKey = '[Statistics Page]';

export const loadGameSessions = createAction(`${historyPageKey} Load Game Sessions`, props<{ userId: number }>());
export const loadGameSessionsSuccess = createAction(
  `${historyPageKey} Load Game Sessions Success`,
  props<{ gameSessions: GameSession[] }>(),
);
export const loadGameSessionsFailure = createAction(
  `${historyPageKey} Load Game Sessions Failure`,
  props<{ error: string }>(),
);

export const loadUserStatistics = createAction(
  `${statisticsPageKey} Load User Statistics`,
  props<{
    userId: number;
  }>(),
);
export const loadUserStatisticsSuccess = createAction(
  `${statisticsPageKey} Load User Statistics Success`,
  props<{ userStatistics: UserStatistics }>(),
);
export const loadUserStatisticsFailure = createAction(
  `${statisticsPageKey} Load User Statistics Failure`,
  props<{ error: string }>(),
);
