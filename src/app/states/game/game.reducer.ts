import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '@Enums/state-status.enum';
import { GAME_STATE_CONFIG } from '@States/game/game.config';
import {
  createGameSession,
  createGameSessionFailure,
  createGameSessionSuccess,
  joinGameSession,
  joinGameSessionFailure,
  joinGameSessionSuccess,
  nextGameSessionPhase,
  nextGameSessionPhaseFailure,
  nextGameSessionPhaseSuccess,
  previousGameSessionPhase,
  previousGameSessionPhaseFailure,
  previousGameSessionPhaseSuccess,
  resetGameSessionPhase,
  resetGameSessionPhaseFailure,
  resetGameSessionPhaseSuccess,
  updatePlayer,
  updatePlayerFailure,
  updatePlayerSuccess,
} from '@States/game/game.actions';

export const gameReducer = createReducer(
  GAME_STATE_CONFIG.initialState,
  on(createGameSession, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(createGameSessionSuccess, (state, { gameSession, player }) => ({
    ...state,
    gameSession,
    player,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(createGameSessionFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),

  on(joinGameSession, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(joinGameSessionSuccess, (state, { gameSession, player }) => ({
    ...state,
    gameSession,
    player,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(joinGameSessionFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(updatePlayer, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(updatePlayerSuccess, (state, { player }) => ({
    ...state,
    player,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(updatePlayerFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(nextGameSessionPhase, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(nextGameSessionPhaseSuccess, (state, { gameSession }) => ({
    ...state,
    gameSession,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(nextGameSessionPhaseFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(previousGameSessionPhase, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(previousGameSessionPhaseSuccess, (state, { gameSession }) => ({
    ...state,
    gameSession,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(previousGameSessionPhaseFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(resetGameSessionPhase, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(resetGameSessionPhaseSuccess, (state, { gameSession }) => ({
    ...state,
    gameSession,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(resetGameSessionPhaseFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
);
