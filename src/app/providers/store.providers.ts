import { cardReducer } from '@States/cards/card.reducer';
import { characterReducer } from '@States/characters/character.reducer';
import { gameSessionReducer } from '@States/game-sessions/game-session.reducer';
import { gameReducer } from '@States/game/game.reducer';

export const STORE_PROVIDERS = {
  cards: cardReducer,
  characters: characterReducer,
  gameSessions: gameSessionReducer,
  game: gameReducer,
};
