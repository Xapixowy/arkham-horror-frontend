import { CardState } from './cards/card.state';
import { CharacterState } from './characters/character.state';
import { GameSessionState } from '@States/game-sessions/game-session.state';

export type AppState = {
  cards: CardState;
  characters: CharacterState;
  gameSessions: GameSessionState;
};
