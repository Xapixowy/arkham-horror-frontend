import { firstValueFrom } from 'rxjs';
import { Translation, TranslocoService } from '@jsverse/transloco';
import { LanguageService } from '@Features/language/_services/language.service';

export const appLanguageFactory = (
  translocoService: TranslocoService,
  languageService: LanguageService,
): (() => Promise<Translation>) => {
  return () => {
    const currentLanguage = languageService.language;
    translocoService.setActiveLang(currentLanguage);

    return firstValueFrom(translocoService.load(currentLanguage));
  };
};
