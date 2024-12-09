import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '@Enums/state-status.enum';
import { GAME_STATE_CONFIG } from '@States/game/game.config';
import { createGameSession, createGameSessionFailure, createGameSessionSuccess } from '@States/game/game.actions';

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
);
