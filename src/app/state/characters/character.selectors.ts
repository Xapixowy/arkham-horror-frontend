import {AppState} from '@State/app.state';
import {createSelector} from '@ngrx/store';

export const selectCharacterState = (state: AppState) => state.characters;

export const selectCharacters = createSelector(selectCharacterState, (state) => state.characters);

export const selectCharacterStatus = createSelector(selectCharacterState, (state) => state.status);

export const selectCharacterError = createSelector(selectCharacterState, (state) => state.error);

export const selectCharacterTranslations = (characterId: number) =>
  createSelector(selectCharacterState, (state) => state.characters.find((character) => character.id === characterId)?.translations ?? []);
