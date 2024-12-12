import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectGameState = (state: AppState) => state.game;

export const selectGameStatus = createSelector(selectGameState, (state) => state.status);

export const selectGameError = createSelector(selectGameState, (state) => state.error);

export const selectGameSession = createSelector(selectGameState, (state) => state.gameSession);

export const selectPlayer = createSelector(selectGameState, (state) => state.player);
