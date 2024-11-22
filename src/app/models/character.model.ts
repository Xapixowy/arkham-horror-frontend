import {Language} from '@Features/language/_enums/language.enum';
import {Expansion} from '@Enums/expansion.enum';
import {Attributes} from '@Types/characters/attributes.type';
import {Skill} from '@Types/characters/skill.type';
import {Equipment} from '@Types/characters/equipment.type';
import {CharacterDto} from '@Types/dtos/character-dto.type';
import {CharacterTranslation} from '@Models/character-translation.model';
import {CharacterCard} from '@Models/character-card.model';

export class Character {
  constructor(
    public id: number,
    public expansion: Expansion,
    public name: string,
    public description: string,
    public profession: string,
    public starting_location: string,
    public image_path: string,
    public sanity: number,
    public endurance: number,
    public concentration: number,
    public attributes: Attributes,
    public skills: Skill[],
    public equipment: Equipment,
    public locale: Language,
    public created_at: Date,
    public updated_at: Date,
    public characterCards?: CharacterCard[],
    public translations?: CharacterTranslation[],
  ) {
  }

  static fromDto(dto: CharacterDto): Character {
    return new Character(
      dto.id,
      dto.expansion,
      dto.name,
      dto.description,
      dto.profession,
      dto.starting_location,
      dto.image_path,
      dto.sanity,
      dto.endurance,
      dto.concentration,
      dto.attributes,
      dto.skills,
      dto.equipment,
      dto.locale,
      new Date(dto.created_at),
      new Date(dto.updated_at),
      dto.characterCards?.map((characterCardDto) => CharacterCard.fromDto(characterCardDto)),
    );
  }
}
