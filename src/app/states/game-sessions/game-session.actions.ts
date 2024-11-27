import { createAction, props } from '@ngrx/store';
import { GameSession } from '@Models/game-session.model';

const gameSessionsPageKey = '[Game Sessions Page]';
const gameSessionsApiKey = '[Game Sessions API]';

export const removeGameSession = createAction(`${gameSessionsPageKey} Remove Game Session`, props<{ token: string }>());
export const removeGameSessionSuccess = createAction(
  `${gameSessionsApiKey} Remove Game Session Success`,
  props<{
    token: string;
  }>(),
);
export const removeGameSessionFailure = createAction(
  `${gameSessionsApiKey} Remove Game Session Failure`,
  props<{
    error: string;
  }>(),
);

export const loadGameSessions = createAction(`${gameSessionsPageKey} Load Game Sessions`);
export const loadGameSessionsSuccess = createAction(
  `${gameSessionsApiKey} Load Game Sessions Success`,
  props<{
    gameSessions: GameSession[];
  }>(),
);
export const loadGameSessionsFailure = createAction(
  `${gameSessionsApiKey} Load Game Sessions Failure`,
  props<{
    error: string;
  }>(),
);

export const resetGameSessionPhase = createAction(`${gameSessionsPageKey} Reset Phase`, props<{ token: string }>());
export const resetGameSessionPhaseSuccess = createAction(
  `${gameSessionsApiKey} Reset Phase Success`,
  props<{
    gameSession: GameSession;
  }>(),
);
export const resetGameSessionPhaseFailure = createAction(
  `${gameSessionsApiKey} Reset Phase Failure`,
  props<{
    error: string;
  }>(),
);

export const nextGameSessionPhase = createAction(`${gameSessionsPageKey} Next Phase`, props<{ token: string }>());
export const nextGameSessionPhaseSuccess = createAction(
  `${gameSessionsApiKey} Next Phase Success`,
  props<{
    gameSession: GameSession;
  }>(),
);
export const nextGameSessionPhaseFailure = createAction(
  `${gameSessionsApiKey} Next Phase Failure`,
  props<{
    error: string;
  }>(),
);

export const previousGameSessionPhase = createAction(
  `${gameSessionsPageKey} Previous Phase`,
  props<{
    token: string;
  }>(),
);
export const previousGameSessionPhaseSuccess = createAction(
  `${gameSessionsApiKey} Previous Phase Success`,
  props<{
    gameSession: GameSession;
  }>(),
);
export const previousGameSessionPhaseFailure = createAction(
  `${gameSessionsApiKey} Previous Phase Failure`,
  props<{
    error: string;
  }>(),
);
