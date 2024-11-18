import {Language} from '@Features/language/_enums/language.enum';

export const APP_CONFIG: {
  defaultLanguage: Language
  availableLanguages: Language[]
} = {
  defaultLanguage: Language.POLISH,
  availableLanguages: [Language.POLISH, Language.ENGLISH],
}
