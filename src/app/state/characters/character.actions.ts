import {createAction, props} from '@ngrx/store';
import {Language} from '@Features/language/_enums/language.enum';
import {Character} from '@Models/character.model';
import {CharacterTranslation} from '@Models/character-translation.model';
import {AddCharacterPayload} from '@Types/payloads/characters/add-character-payload.type';
import {UpdateCharacterPayload} from '@Types/payloads/characters/update-character-payload.type';
import {
  AddCharacterTranslationPayload
} from '@Types/payloads/character-translations/add-character-translation-payload.type';
import {
  UpdateCharacterTranslationPayload
} from '@Types/payloads/character-translations/update-character-translation-payload.type';

const charactersPageKey = '[Characters Page]';
const charactersApiKey = '[Characters API]';
const characterTranslationsApiKey = '[Character Translations API]';

export const addCharacter = createAction(
  `${charactersPageKey} Add Character`,
  props<{
    payload: AddCharacterPayload;
    image: File;
  }>(),
);
export const addCharacterSuccess = createAction(`${charactersApiKey} Add Character Success`, props<{
  character: Character
}>());
export const addCharacterFailure = createAction(`${charactersApiKey} Add Character Failure`, props<{
  error: string
}>());

export const updateCharacter = createAction(
  `${charactersPageKey} Update Character`,
  props<{
    characterId: number;
    payload: UpdateCharacterPayload;
    image: File;
  }>(),
);
export const updateCharacterSuccess = createAction(`${charactersApiKey} Update Character Success`, props<{
  character: Character
}>());
export const updateCharacterFailure = createAction(`${charactersApiKey} Update Character Failure`, props<{
  error: string
}>());

export const removeCharacter = createAction(`${charactersPageKey} Remove Character`, props<{ id: number }>());
export const removeCharacterSuccess = createAction(`${charactersApiKey} Remove Character Success`, props<{
  id: number
}>());
export const removeCharacterFailure = createAction(`${charactersApiKey} Remove Character Failure`, props<{
  error: string
}>());

export const loadCharacters = createAction(`${charactersPageKey} Load Characters`);
export const loadCharactersSuccess = createAction(`${charactersApiKey} Load Character Success`, props<{
  characters: Character[]
}>());
export const loadCharactersFailure = createAction(`${charactersApiKey} Load Character Failure`, props<{
  error: string
}>());

export const addCharacterTranslation = createAction(
  `${charactersPageKey} Add Character Translation`,
  props<{ characterId: number; payload: AddCharacterTranslationPayload }>(),
);
export const addCharacterTranslationSuccess = createAction(
  `${characterTranslationsApiKey} Add Character Translation Success`,
  props<{ characterId: number; characterTranslation: CharacterTranslation }>(),
);
export const addCharacterTranslationFailure = createAction(
  `${characterTranslationsApiKey} Add Character Translation Failure`,
  props<{ error: string }>(),
);

export const updateCharacterTranslation = createAction(
  `${charactersPageKey} Update Character Translation`,
  props<{ characterId: number; locale: Language; payload: UpdateCharacterTranslationPayload }>(),
);
export const updateCharacterTranslationSuccess = createAction(
  `${characterTranslationsApiKey} Update Character Translation Success`,
  props<{ characterId: number; characterTranslation: CharacterTranslation }>(),
);
export const updateCharacterTranslationFailure = createAction(
  `${characterTranslationsApiKey} Update Character Translation Failure`,
  props<{ error: string }>(),
);

export const removeCharacterTranslation = createAction(
  `${charactersPageKey} Remove Character Translation`,
  props<{ characterId: number; locale: Language }>(),
);
export const removeCharacterTranslationSuccess = createAction(
  `${characterTranslationsApiKey} Remove Character Translation Success`,
  props<{ characterId: number; locale: Language }>(),
);
export const removeCharacterTranslationFailure = createAction(
  `${characterTranslationsApiKey} Remove Character Translation Failure`,
  props<{ error: string }>(),
);

export const loadCharacterTranslations = createAction(`${charactersPageKey} Load Character Translations`, props<{
  characterId: number
}>());
export const loadCharacterTranslationsSuccess = createAction(
  `${characterTranslationsApiKey} Load Character Translations Success`,
  props<{ characterId: number; characterTranslations: CharacterTranslation[] }>(),
);
export const loadCharacterTranslationsFailure = createAction(
  `${characterTranslationsApiKey} Load Character Translations Failure`,
  props<{ error: string }>(),
);
