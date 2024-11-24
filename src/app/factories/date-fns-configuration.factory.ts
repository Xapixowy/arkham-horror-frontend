import {LocalStorageService} from '@Services/local-storage.service';
import {APP_CONFIG} from '@Configs/app.config';
import {DATE_FNS_CONFIG} from '@Configs/date-fns.config';
import {enUS, pl} from 'date-fns/locale';
import {Language} from '@Features/language/_enums/language.enum';
import {setDefaultOptions} from 'date-fns';

export const dateFnsConfigurationFactory = (localStorageService: LocalStorageService): () => Promise<void> => {
  return () => new Promise<void>((resolve) => {
    const locale = localStorageService.language;
    const dateFnsLocale = APP_CONFIG.availableLanguages.includes(locale) ? locale : APP_CONFIG.defaultLanguage;
    const config = DATE_FNS_CONFIG;

    switch (dateFnsLocale) {
      case Language.ENGLISH:
        config.locale = enUS;
        break;
      default:
        config.locale = pl;
        break;
    }

    setDefaultOptions(config);
    resolve();
  });
};
