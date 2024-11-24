import {APP_INITIALIZER} from '@angular/core';
import {appLanguageFactory} from '@Factories/transloco-language.factory';
import {TranslocoService} from '@jsverse/transloco';
import {LanguageService} from '@Features/language/_services/language.service';
import {TitleStrategy} from '@angular/router';
import {TitleStrategyService} from '@Services/title-strategy.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {dateFnsConfigurationFactory} from '@Factories/date-fns-configuration.factory';
import {LocalStorageService} from '@Services/local-storage.service';

export const APP_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: appLanguageFactory,
    deps: [TranslocoService, LanguageService],
  },
  {
    provide: APP_INITIALIZER,
    useFactory: dateFnsConfigurationFactory,
    deps: [LocalStorageService],
    multi: true,
  },
  {
    provide: TitleStrategy,
    useClass: TitleStrategyService,
  },
  MessageService,
  ConfirmationService
];
