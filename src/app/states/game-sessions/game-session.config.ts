import { StateStatus } from '@Enums/state-status.enum';
import { GameSessionState } from '@States/game-sessions/game-session.state';

export const GAME_SESSION_STATE_CONFIG: {
  initialState: GameSessionState;
  toastTranslationKeys: {
    gameSessions: string;
    players: string;
    removeGameSessionSuccess: string;
    resetGameSessionPhaseSuccess: string;
    nextGameSessionPhaseSuccess: string;
    previousGameSessionPhaseSuccess: string;
    renewPlayerCharacterSuccess: string;
    updatePlayerSuccess: string;
    removePlayerSuccess: string;
  };
} = {
  initialState: {
    gameSessions: [],
    error: null,
    status: StateStatus.PENDING,
  },
  toastTranslationKeys: {
    gameSessions: '_GameSessionsPage.Game Sessions',
    players: '_GameSessionsPage.Players',
    removeGameSessionSuccess: '_GameSessionsPage.Game Session has been deleted',
    resetGameSessionPhaseSuccess: '_GameSessionsPage.Game Session phase has been reset',
    nextGameSessionPhaseSuccess: '_GameSessionsPage.Game Session phase has been advanced',
    previousGameSessionPhaseSuccess: '_GameSessionsPage.Game Session phase has been retreated',
    updatePlayerSuccess: '_GameSessionsPage.Player has been updated',
    removePlayerSuccess: '_GameSessionsPage.Player has been deleted',
    renewPlayerCharacterSuccess: '_GameSessionsPage.Player character has been renewed',
  },
};
