import {Language} from '@Features/language/_enums/language.enum';
import {Skill} from '@Types/characters/skill.type';
import {CharacterTranslationDto} from '@Types/dtos/character-translation-dto.type';

export class CharacterTranslation {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public profession: string,
    public starting_location: string,
    public skills: Skill[],
    public locale: Language,
    public created_at: Date,
    public updated_at: Date,
  ) {
  }

  static fromDto(dto: CharacterTranslationDto): CharacterTranslation {
    return new CharacterTranslation(
      dto.id,
      dto.name,
      dto.description,
      dto.profession,
      dto.starting_location,
      dto.skills,
      dto.locale,
      new Date(dto.created_at),
      new Date(dto.updated_at),
    );
  }
}
