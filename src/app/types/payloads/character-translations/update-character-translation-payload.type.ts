import {Skill} from '@Types/characters/skill.type';

export type UpdateCharacterTranslationPayload = {
  name?: string | null,
  description?: string | null,
  profession?: string | null,
  starting_location?: string | null,
  skills?: Skill[] | null,
};
