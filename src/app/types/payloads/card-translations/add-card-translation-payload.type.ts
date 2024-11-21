import { Language } from '@Features/language/_enums/language.enum';

export type AddCardTranslationPayload = {
  name: string;
  description: string;
  locale: Language;
};
