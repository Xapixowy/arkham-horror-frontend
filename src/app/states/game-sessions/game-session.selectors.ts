import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';

export const selectGameSessionState = (state: AppState) => state.gameSessions;

export const selectGameSessions = createSelector(selectGameSessionState, (state) => state.gameSessions);

export const selectGameSessionStatus = createSelector(selectGameSessionState, (state) => state.status);

export const selectGameSessionError = createSelector(selectGameSessionState, (state) => state.error);

export const selectPlayers = (gameSessionToken: string) =>
  createSelector(
    selectGameSessionState,
    (state) => state.gameSessions.find((gameSession) => gameSession.token === gameSessionToken)?.players ?? [],
  );
