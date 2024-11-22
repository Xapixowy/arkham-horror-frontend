import {Language} from '@Features/language/_enums/language.enum';
import {Expansion} from '@Enums/expansion.enum';
import {Attributes} from '@Types/characters/attributes.type';
import {Skill} from '@Types/characters/skill.type';
import {Equipment} from '@Types/characters/equipment.type';
import {CharacterCardDto} from '@Types/dtos/character-card-dto.type';

export type CharacterDto = {
  id: number,
  expansion: Expansion,
  name: string,
  description: string,
  profession: string,
  starting_location: string,
  image_path: string,
  sanity: number,
  endurance: number,
  concentration: number,
  attributes: Attributes,
  skills: Skill[],
  equipment: Equipment,
  locale: Language,
  created_at: string,
  updated_at: string,
  characterCards?: CharacterCardDto[],
};
