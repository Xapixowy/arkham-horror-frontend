import { createAction, props } from '@ngrx/store';
import { GameSession } from '@Models/game-session.model';
import { Player } from '@Models/player.model';
import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';
import { PlayerDto } from '@Types/dtos/player-dto.type';
import { UpdatePlayerPayload } from '@Types/payloads/players/update-player-payload.type';
import { AssignPlayerCardsPayload } from '@Types/payloads/players/assign-player-cards-payload.type';
import { RemovePlayerCardsPayload } from '@Types/payloads/players/remove-player-cards-payload.type';
import { PlayerCard } from '@Models/player-card.model';

const landingPageKey = '[Landing Page]';
const gameLayoutKey = '[Game Layout]';
const gameSessionsApiKey = '[Game Sessions API]';
const playersApiKey = '[Players API]';

export const clearState = createAction(`${landingPageKey} Clear State`);
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
  `${gameLayoutKey} Update Player`,
  props<{
    gameSessionToken: string;
    playerToken: string;
    payload: UpdatePlayerPayload;
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
export const nextGameSessionPhase = createAction(
  `${gameLayoutKey} Next Game Session Phase`,
  props<{
    gameSessionToken: string;
  }>(),
);
export const nextGameSessionPhaseSuccess = createAction(
  `${gameSessionsApiKey} Next Game Session Phase Success`,
  props<{
    gameSession: GameSession;
  }>(),
);
export const nextGameSessionPhaseFailure = createAction(
  `${gameSessionsApiKey} Next Game Session Phase Failure`,
  props<{
    error: string;
  }>(),
);
export const previousGameSessionPhase = createAction(
  `${gameLayoutKey} Previous Game Session Phase`,
  props<{
    gameSessionToken: string;
  }>(),
);
export const previousGameSessionPhaseSuccess = createAction(
  `${gameSessionsApiKey} Previous Game Session Phase Success`,
  props<{
    gameSession: GameSession;
  }>(),
);
export const previousGameSessionPhaseFailure = createAction(
  `${gameSessionsApiKey} Previous Game Session Phase Failure`,
  props<{
    error: string;
  }>(),
);
export const resetGameSessionPhase = createAction(
  `${gameLayoutKey} Reset Game Session Phase`,
  props<{
    gameSessionToken: string;
  }>(),
);
export const resetGameSessionPhaseSuccess = createAction(
  `${gameSessionsApiKey} Reset Game Session Phase Success`,
  props<{
    gameSession: GameSession;
  }>(),
);
export const resetGameSessionPhaseFailure = createAction(
  `${gameSessionsApiKey} Reset Game Session Phase Failure`,
  props<{
    error: string;
  }>(),
);
export const updateGameSessionPhase = createAction(
  `${gameLayoutKey} Update Game Session Phase`,
  props<{
    gameSessionToken: string;
    phase: GameSessionPhase;
  }>(),
);
export const updateGameSessionPlayers = createAction(
  `${gameLayoutKey} Update Game Session Players`,
  props<{
    gameSessionToken: string;
    player: PlayerDto;
  }>(),
);
export const createGameSessionPlayer = createAction(
  `${gameLayoutKey} Create Game Session Player`,
  props<{
    gameSessionToken: string;
    player: PlayerDto;
  }>(),
);
export const renewPlayerCharacter = createAction(
  `${gameLayoutKey} Renew Player Character`,
  props<{
    gameSessionToken: string;
    playerToken: string;
  }>(),
);
export const renewPlayerCharacterSuccess = createAction(
  `${playersApiKey} Renew Player Character Success`,
  props<{
    player: Player;
  }>(),
);
export const renewPlayerCharacterFailure = createAction(
  `${playersApiKey} Renew Player Character Failure`,
  props<{
    error: string;
  }>(),
);
export const updatePlayerCards = createAction(
  `${gameLayoutKey} Update Player Cards`,
  props<{
    gameSessionToken: string;
    playerToken: string;
    assignPlayerCardsPayload: AssignPlayerCardsPayload;
    removePlayerCardsPayload: RemovePlayerCardsPayload;
  }>(),
);
export const updatePlayerCardsSuccess = createAction(
  `${playersApiKey} Update Player Cards Success`,
  props<{
    cards: PlayerCard[];
  }>(),
);
export const updatePlayerCardsFailure = createAction(
  `${playersApiKey} Update Player Cards Failure`,
  props<{
    error: string;
  }>(),
);
