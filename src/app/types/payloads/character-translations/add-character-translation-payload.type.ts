import {Language} from '@Features/language/_enums/language.enum';
import {Skill} from '@Types/characters/skill.type';

export type AddCharacterTranslationPayload = {
  name: string,
  description: string,
  profession: string,
  starting_location: string,
  skills: Skill[],
  locale: Language;
};
