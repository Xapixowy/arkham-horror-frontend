import { Language } from '@Features/language/_enums/language.enum';

export type CardTranslationDto = {
  id: number;
  name: string;
  description: string;
  locale: Language;
  created_at: string;
  updated_at: string;
};
