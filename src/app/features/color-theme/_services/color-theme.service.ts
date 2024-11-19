import { inject, Injectable } from '@angular/core';
import { ColorTheme } from '../../color-theme/_enums/color-theme.enum';
import { COLOR_THEME_SERVICE_CONFIG } from '@Features/color-theme/_configs/color-theme-service.config';
import { LocalStorageService } from '@Services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    this.subscribeToThemeChanges();
  }

  get isDarkTheme(): boolean {
    return this.localStorageService.colorTheme === ColorTheme.DARK;
  }

  set isDarkTheme(value: boolean) {
    this.localStorageService.colorTheme = value ? ColorTheme.DARK : ColorTheme.LIGHT;
  }

  private subscribeToThemeChanges(): void {
    this.localStorageService.colorThemeSubject.subscribe((theme) => {
      this.loadTheme(theme);
    });
  }

  private loadTheme(theme: ColorTheme): void {
    const cssLink = document.getElementById('app-theme') as HTMLLinkElement | undefined;

    if (cssLink) {
      cssLink.href =
        theme === ColorTheme.DARK
          ? COLOR_THEME_SERVICE_CONFIG.darkThemeCssFilename
          : COLOR_THEME_SERVICE_CONFIG.lightThemeCssFilename;
    }
  }
}
