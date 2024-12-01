import {createAction, props} from '@ngrx/store';
import {GameSession} from '@Models/game-session.model';
import {UpdatePlayerPayload} from '@Types/payloads/players/update-player-payload.type';
import {Player} from '@Models/player.model';
import {AssignPlayerCardsPayload} from '@Types/payloads/players/assign-player-cards-payload.type';
import {RemovePlayerCardsPayload} from '@Types/payloads/players/remove-player-cards-payload.type';

const gameSessionsPageKey = '[Game Sessions Page]';
const gameSessionsApiKey = '[Game Sessions API]';
const playersApiKey = '[Players API]';

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

export const updatePlayer = createAction(
  `${gameSessionsPageKey} Update Player`,
  props<{
    gameSessionToken: string;
    playerToken: string;
    updatePlayerPayload: UpdatePlayerPayload;
    assignPlayerCardsPayload: AssignPlayerCardsPayload;
    removePlayerCardsPayload: RemovePlayerCardsPayload;
  }>(),
);
export const updatePlayerSuccess = createAction(
  `${playersApiKey} Update Player Success`,
  props<{
    gameSessionToken: string;
    player: Player;
  }>(),
);
export const updatePlayerFailure = createAction(
  `${playersApiKey} Update Player Failure`,
  props<{
    error: string;
  }>(),
);

export const removePlayer = createAction(
  `${gameSessionsPageKey} Remove Player`,
  props<{
    gameSessionToken: string;
    playerToken: string;
  }>(),
);
export const removePlayerSuccess = createAction(
  `${playersApiKey} Remove Player Success`,
  props<{
    gameSessionToken: string;
    playerToken: string;
  }>(),
);
export const removePlayerFailure = createAction(
  `${playersApiKey} Remove Player Failure`,
  props<{
    error: string;
  }>(),
);

export const renewPlayerCharacter = createAction(
  `${gameSessionsPageKey} Renew Player Character`,
  props<{
    gameSessionToken: string;
    playerToken: string;
  }>(),
);
export const renewPlayerCharacterSuccess = createAction(
  `${playersApiKey} Renew Player Character Success`,
  props<{
    gameSessionToken: string;
    player: Player;
  }>(),
);
export const renewPlayerCharacterFailure = createAction(
  `${playersApiKey} Renew Player Character Failure`,
  props<{
    error: string;
  }>(),
);

export const loadPlayers = createAction(
  `${gameSessionsPageKey} Load Players`,
  props<{
    token: string;
  }>(),
);
export const loadPlayersSuccess = createAction(
  `${playersApiKey} Load Players Success`,
  props<{
    gameSessionToken: string;
    players: Player[];
  }>(),
);
export const loadPlayersFailure = createAction(
  `${playersApiKey} Load Players Failure`,
  props<{
    error: string;
  }>(),
);
