import { StateStatus } from '@Enums/state-status.enum';
import { GameState } from '@States/game/game.state';

export const GAME_STATE_CONFIG: {
  initialState: GameState;
  toastTranslationKeys: {
    gameSessions: string;
    players: string;
    createGameSessionSuccess: string;
    joinGameSessionSuccess: string;
    resetGameSessionPhaseSuccess: string;
    nextGameSessionPhaseSuccess: string;
    previousGameSessionPhaseSuccess: string;
  };
} = {
  initialState: {
    gameSession: null,
    player: null,
    error: null,
    status: StateStatus.PENDING,
  },
  toastTranslationKeys: {
    gameSessions: '_GameState.Game Sessions',
    players: '_GameState.Players',
    createGameSessionSuccess: '_GameState.Game Session has been created',
    joinGameSessionSuccess: '_GameState.Game Session joined successfully',
    resetGameSessionPhaseSuccess: '_GameState.Game Session phase has been reset',
    nextGameSessionPhaseSuccess: '_GameState.Game Session phase has been advanced',
    previousGameSessionPhaseSuccess: '_GameState.Game Session phase has been retreated',
  },
};
