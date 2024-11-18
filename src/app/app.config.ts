import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {TranslocoHttpLoader} from '@Loaders/transloco.loader';
import {provideTransloco} from '@jsverse/transloco';
import {APP_PROVIDERS} from '@Providers/index';
import {APP_ROUTES} from '@Routes/index';
import {APP_CONFIG} from '@Configs/app.config';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(APP_ROUTES),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: APP_CONFIG.availableLanguages,
        defaultLang: APP_CONFIG.defaultLanguage,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideAnimations(),
    ...APP_PROVIDERS
  ]
};
