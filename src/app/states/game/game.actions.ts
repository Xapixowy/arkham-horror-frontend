import { createAction, props } from '@ngrx/store';
import { GameSession } from '@Models/game-session.model';
import { Player } from '@Models/player.model';

const landingPageKey = '[Landing Page]';
const characterPageKey = '[Character Page]';
const gameSessionsApiKey = '[Game Sessions API]';
const playersApiKey = '[Players API]';

export const createGameSession = createAction(`${landingPageKey} Create Game Session`);
export const createGameSessionSuccess = createAction(
  `${gameSessionsApiKey} Create Game Session Success`,
  props<{
    gameSession: GameSession;
    player: Player;
  }>(),
);
export const createGameSessionFailure = createAction(
  `${gameSessionsApiKey} Create Game Session Failure`,
  props<{
    error: string;
  }>(),
);

export const joinGameSession = createAction(
  `${landingPageKey} Join Game Session`,
  props<{
    gameSessionToken: string;
  }>(),
);
export const joinGameSessionSuccess = createAction(
  `${gameSessionsApiKey} Join Game Session Success`,
  props<{
    gameSession: GameSession;
    player: Player;
  }>(),
);
export const joinGameSessionFailure = createAction(
  `${gameSessionsApiKey} Join Game Session Failure`,
  props<{
    error: string;
  }>(),
);
export const updatePlayer = createAction(
  `${characterPageKey} Update Player`,
  props<{
    gameSessionToken: string;
    playerToken: string;
    payload: any;
  }>(),
);
export const updatePlayerSuccess = createAction(
  `${playersApiKey} Update Player Success`,
  props<{
    player: Player;
  }>(),
);
export const updatePlayerFailure = createAction(
  `${playersApiKey} Update Player Failure`,
  props<{
    error: string;
  }>(),
);
