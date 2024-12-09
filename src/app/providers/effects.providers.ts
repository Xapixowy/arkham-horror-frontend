import { CardEffects } from '@States/cards/card.effects';
import { CharacterEffects } from '@States/characters/character.effects';
import { GameSessionEffects } from '@States/game-sessions/game-session.effects';
import { GameEffects } from '@States/game/game.effects';

export const EFFECTS_PROVIDERS = [CardEffects, CharacterEffects, GameSessionEffects, GameEffects];
