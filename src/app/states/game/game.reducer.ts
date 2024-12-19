import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '@Enums/state-status.enum';
import { GAME_STATE_CONFIG } from '@States/game/game.config';
import {
  clearState,
  createGameSession,
  createGameSessionFailure,
  createGameSessionPlayer,
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
  renewPlayerCharacter,
  renewPlayerCharacterFailure,
  renewPlayerCharacterSuccess,
  resetGameSessionPhase,
  resetGameSessionPhaseFailure,
  resetGameSessionPhaseSuccess,
  updateGameSessionPhase,
  updateGameSessionPlayers,
  updatePlayer,
  updatePlayerCards,
  updatePlayerCardsFailure,
  updatePlayerCardsSuccess,
  updatePlayerFailure,
  updatePlayerSuccess,
} from '@States/game/game.actions';
import { GameSession } from '@Models/game-session.model';
import { Player } from '@Models/player.model';

export const gameReducer = createReducer(
  GAME_STATE_CONFIG.initialState,
  on(clearState, () => GAME_STATE_CONFIG.initialState),
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
  on(updateGameSessionPhase, (state, { gameSessionToken, phase }) => {
    if (state.gameSession?.token !== gameSessionToken) {
      return state;
    }

    return {
      ...state,
      gameSession: new GameSession(
        state.gameSession.id,
        state.gameSession.token,
        phase,
        state.gameSession.created_at,
        state.gameSession.updated_at,
        state.gameSession.players,
      ),
      status: StateStatus.LOADING,
    };
  }),
  on(updateGameSessionPlayers, (state, { gameSessionToken, player }) => {
    if (state.gameSession?.token !== gameSessionToken) {
      return state;
    }

    return {
      ...state,
      gameSession: new GameSession(
        state.gameSession.id,
        state.gameSession.token,
        state.gameSession.phase,
        state.gameSession.created_at,
        state.gameSession.updated_at,
        state.gameSession.players?.map((p) => (p.id === player.id ? Player.fromDto(player) : p)),
      ),
      status: StateStatus.LOADING,
    };
  }),
  on(createGameSessionPlayer, (state, { gameSessionToken, player }) => {
    if (state.gameSession?.token !== gameSessionToken) {
      return state;
    }

    return {
      ...state,
      gameSession: new GameSession(
        state.gameSession.id,
        state.gameSession.token,
        state.gameSession.phase,
        state.gameSession.created_at,
        state.gameSession.updated_at,
        state.gameSession.players?.concat(Player.fromDto(player)),
      ),
      status: StateStatus.LOADING,
    };
  }),
  on(renewPlayerCharacter, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(renewPlayerCharacterSuccess, (state, { player }) => {
    const updatedGameSession = state.gameSession
      ? {
          ...state.gameSession,
          players: state.gameSession.players
            ? state.gameSession.players.map((p) => (p.token === player.token ? player : p))
            : state.gameSession.players,
        }
      : null;

    return {
      ...state,
      gameSession: updatedGameSession,
      player,
      status: StateStatus.LOADING,
    };
  }),
  on(renewPlayerCharacterFailure, (state, { error }) => {
    return {
      ...state,
      status: StateStatus.ERROR,
      error,
    };
  }),
  on(updatePlayerCards, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(updatePlayerCardsSuccess, (state, { cards }) => {
    const updatedPlayer = state.player ? { ...state.player, playerCards: cards } : null;

    return {
      ...state,
      player: updatedPlayer,
      status: StateStatus.SUCCESS,
    };
  }),
  on(updatePlayerCardsFailure, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
);
