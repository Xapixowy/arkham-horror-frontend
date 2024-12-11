import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectDashboardState = (state: AppState) => state.dashboard;

export const selectGameSessions = createSelector(selectDashboardState, (state) => state.gameSessions);

export const selectUserStatistics = createSelector(selectDashboardState, (state) => state.userStatistics);
