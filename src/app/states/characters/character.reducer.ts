import {createReducer, on} from '@ngrx/store';
import {
  addCharacter,
  addCharacterFailure,
  addCharacterSuccess,
  addCharacterTranslation,
  addCharacterTranslationFailure,
  addCharacterTranslationSuccess,
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  loadCharacterTranslations,
  loadCharacterTranslationsFailure,
  loadCharacterTranslationsSuccess,
  removeCharacter,
  removeCharacterFailure,
  removeCharacterSuccess,
  removeCharacterTranslation,
  removeCharacterTranslationFailure,
  removeCharacterTranslationSuccess,
  updateCharacter,
  updateCharacterFailure,
  updateCharacterSuccess,
  updateCharacterTranslation,
  updateCharacterTranslationFailure,
  updateCharacterTranslationSuccess,
} from './character.actions';
import {StateStatus} from '@Enums/state-status.enum';
import {CHARACTER_STATE_CONFIG} from '../characters/character.config';
import {Character} from '@Models/character.model';
import {CharacterTranslation} from '@Models/character-translation.model';

export const characterReducer = createReducer(
  CHARACTER_STATE_CONFIG.initialState,
  on(addCharacter, (state) => ({...state, status: StateStatus.LOADING})),
  on(addCharacterSuccess, (state, {character}) => ({
    ...state,
    characters: [...state.characters, character],
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(addCharacterFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(updateCharacter, (state) => ({...state, status: StateStatus.LOADING})),
  on(updateCharacterSuccess, (state, {character}) => ({
    ...state,
    characters: state.characters.map((c: Character) => (c.id === character.id ? character : c)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(updateCharacterFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(removeCharacter, (state) => ({...state, status: StateStatus.LOADING})),
  on(removeCharacterSuccess, (state, {id}) => ({
    ...state,
    characters: state.characters.filter((c: Character) => c.id !== id),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeCharacterFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadCharacters, (state) => ({...state, status: StateStatus.LOADING})),
  on(loadCharactersSuccess, (state, {characters}) => ({
    ...state,
    characters,
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadCharactersFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(addCharacterTranslation, (state) => ({...state, status: StateStatus.LOADING})),
  on(addCharacterTranslationSuccess, (state, {characterId, characterTranslation}) => ({
    ...state,
    characters: state.characters.map((c: Character) =>
      c.id === characterId
        ? {
          ...c,
          translations: [...(c.translations ?? []), characterTranslation],
        }
        : c,
    ),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(addCharacterTranslationFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(updateCharacterTranslation, (state) => ({...state, status: StateStatus.LOADING})),
  on(updateCharacterTranslationSuccess, (state, {characterId, characterTranslation}) => ({
    ...state,
    characters: state.characters.map((c: Character) =>
      c.id === characterId
        ? {
          ...c,
          translations: (c.translations ?? []).map((t: CharacterTranslation) => (t.id === characterTranslation.id ? characterTranslation : t)),
        }
        : c,
    ),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(updateCharacterTranslationFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(removeCharacterTranslation, (state) => ({...state, status: StateStatus.LOADING})),
  on(removeCharacterTranslationSuccess, (state, {characterId, locale}) => ({
    ...state,
    characters: state.characters.map((c: Character) =>
      c.id === characterId
        ? {
          ...c,
          translations: c.translations?.filter((t: CharacterTranslation) => t.locale !== locale),
        }
        : c,
    ),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(removeCharacterTranslationFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
  on(loadCharacterTranslations, (state) => ({...state, status: StateStatus.LOADING})),
  on(loadCharacterTranslationsSuccess, (state, {characterId, characterTranslations}) => ({
    ...state,
    characters: state.characters.map((c: Character) => (c.id === characterId ? {
      ...c,
      translations: characterTranslations
    } : c)),
    status: StateStatus.SUCCESS,
    error: null,
  })),
  on(loadCharacterTranslationsFailure, (state, {error}) => ({
    ...state,
    status: StateStatus.ERROR,
    error,
  })),
);
