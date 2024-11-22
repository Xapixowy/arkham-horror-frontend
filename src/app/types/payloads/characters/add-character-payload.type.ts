import {Attributes} from '@Types/characters/attributes.type';
import {Skill} from '@Types/characters/skill.type';
import {Equipment} from '@Types/characters/equipment.type';
import {Expansion} from '@Enums/expansion.enum';

export type AddCharacterPayload = {
  expansion: Expansion;
  name: string;
  description: string;
  profession: string;
  starting_location: string;
  sanity: number;
  endurance: number;
  concentration: number;
  attributes: Attributes;
  skills: Skill[];
  equipment: Equipment;
  card_ids?: number[] | null;
};
