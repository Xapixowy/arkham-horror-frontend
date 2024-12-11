import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '@Enums/state-status.enum';
import { DASHBOARD_STATE_CONFIG } from '@States/dashboard/dashboard.config';
import {
  loadGameSessions,
  loadGameSessionsFailure,
  loadGameSessionsSuccess,
  loadUserStatistics,
  loadUserStatisticsFailure,
  loadUserStatisticsSuccess,
} from '@States/dashboard/dashboard.actions';

export const dashboardReducer = createReducer(
  DASHBOARD_STATE_CONFIG.initialState,
  on(loadGameSessions, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadGameSessionsSuccess, (state, { gameSessions }) => ({
    ...state,
    gameSessions,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadGameSessionsFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadUserStatistics, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadUserStatisticsSuccess, (state, { userStatistics }) => ({
    ...state,
    userStatistics,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadUserStatisticsFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
);
