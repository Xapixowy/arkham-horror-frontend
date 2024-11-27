import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '@Enums/state-status.enum';
import { GAME_SESSION_STATE_CONFIG } from '@States/game-sessions/game-session.config';
import {
  loadGameSessions,
  loadGameSessionsFailure,
  loadGameSessionsSuccess,
  nextGameSessionPhase,
  nextGameSessionPhaseFailure,
  nextGameSessionPhaseSuccess,
  previousGameSessionPhase,
  previousGameSessionPhaseFailure,
  previousGameSessionPhaseSuccess,
  removeGameSession,
  removeGameSessionFailure,
  removeGameSessionSuccess,
  resetGameSessionPhase,
  resetGameSessionPhaseFailure,
  resetGameSessionPhaseSuccess,
} from '@States/game-sessions/game-session.actions';
import { GameSession } from '@Models/game-session.model';

export const gameSessionReducer = createReducer(
  GAME_SESSION_STATE_CONFIG.initialState,
  on(removeGameSession, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(removeGameSessionSuccess, (state, { token }) => ({
    ...state,
    gameSessions: state.gameSessions.filter((gs: GameSession) => gs.token !== token),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeGameSessionFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
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
  on(resetGameSessionPhase, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(resetGameSessionPhaseSuccess, (state, { gameSession }) => ({
    ...state,
    gameSessions: state.gameSessions.map((gs: GameSession) => (gs.token === gameSession.token ? gameSession : gs)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(resetGameSessionPhaseFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(nextGameSessionPhase, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(nextGameSessionPhaseSuccess, (state, { gameSession }) => ({
    ...state,
    gameSessions: state.gameSessions.map((gs: GameSession) => (gs.token === gameSession.token ? gameSession : gs)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(nextGameSessionPhaseFailure, (state, { error }) => ({ ...state, status: StateStatus.ERROR, error })),
  on(previousGameSessionPhase, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(previousGameSessionPhaseSuccess, (state, { gameSession }) => ({
    ...state,
    gameSessions: state.gameSessions.map((gs: GameSession) => (gs.token === gameSession.token ? gameSession : gs)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(previousGameSessionPhaseFailure, (state, { error }) => ({ ...state, status: StateStatus.ERROR, error })),
);
