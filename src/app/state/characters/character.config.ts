import {CharacterState} from '@State/characters/character.state';
import {StateStatus} from '@Enums/state-status.enum';

export const CHARACTER_STATE_CONFIG: {
  initialState: CharacterState,
  toastTranslationKeys: {
    characters: string,
    characterTranslations: string,
    addCharacterSuccess: string,
    updateCharacterSuccess: string,
    removeCharacterSuccess: string,
    addCharacterTranslationSuccess: string,
    updateCharacterTranslationSuccess: string,
    removeCharacterTranslationSuccess: string,
  },
} = {
  initialState: {
    characters: [],
    error: null,
    status: StateStatus.PENDING
  },
  toastTranslationKeys: {
    characters: '_CharactersPage.Characters',
    characterTranslations: '_CharactersPage.Character translations',
    addCharacterSuccess: '_CharactersPage.Character and image have been added',
    updateCharacterSuccess: '_CharactersPage.Character and image have been updated',
    removeCharacterSuccess: '_CharactersPage.Character has been deleted',
    addCharacterTranslationSuccess: '_CharactersPage.Character translation has been created',
    updateCharacterTranslationSuccess: '_CharactersPage.Character translation has been updated',
    removeCharacterTranslationSuccess: '_CharactersPage.Character translation has been deleted',
  },
};
