import {inject, Injectable} from '@angular/core';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';
import {TranslocoService} from '@jsverse/transloco';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleStrategyService extends TitleStrategy {
  private readonly translocoService = inject(TranslocoService);

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    const appName = this.translocoService.translate('Arkham Horror');
    const pageTitle = title ? this.translocoService.translate(`_Title.${title}`) : undefined;

    this.title.setTitle(pageTitle ? `${appName} - ${pageTitle}` : appName);
  }
}
