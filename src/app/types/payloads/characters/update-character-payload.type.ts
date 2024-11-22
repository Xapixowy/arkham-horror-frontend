import {Attributes} from '@Types/characters/attributes.type';
import {Skill} from '@Types/characters/skill.type';
import {Equipment} from '@Types/characters/equipment.type';
import {Expansion} from '@Enums/expansion.enum';

export type UpdateCharacterPayload = {
  expansion?: Expansion | null;
  name?: string | null;
  description?: string | null;
  profession?: string | null;
  starting_location?: string | null;
  sanity?: number | null;
  endurance?: number | null;
  concentration?: number | null;
  attributes?: Attributes | null;
  skills?: Skill[] | null;
  equipment?: Equipment | null;
  card_ids?: number[] | null;
};
