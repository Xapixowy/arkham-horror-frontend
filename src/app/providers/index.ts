import {APP_INITIALIZER} from '@angular/core';
import {appLanguageFactory} from '@Factories/transloco-language.factory';
import {TranslocoService} from '@jsverse/transloco';
import {TitleStrategy} from '@angular/router';
import {TitleStrategyService} from '@Services/title-strategy.service';
import {LanguageService} from '@Features/language/_services/language.service';

export const APP_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: appLanguageFactory,
    deps: [TranslocoService, LanguageService],
  },
  {
    provide: TitleStrategy,
    useClass: TitleStrategyService,
  }
];
