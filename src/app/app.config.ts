import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from '@Loaders/transloco.loader';
import { provideTransloco } from '@jsverse/transloco';
import { APP_ROUTES } from '@Routes/index';
import { APP_CONFIG } from '@Configs/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_INTERCEPTORS } from '@Providers/app.interceptors';
import { APP_PROVIDERS } from '@Providers/app.providers';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors(APP_INTERCEPTORS)),
    provideTransloco({
      config: {
        availableLangs: APP_CONFIG.availableLanguages,
        defaultLang: APP_CONFIG.defaultLanguage,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAnimations(),
    provideStore(),
    ...APP_PROVIDERS,
  ],
};
