import { Injectable } from '@angular/core';
import { ColorTheme } from '../../color-theme/_enums/color-theme.enum';
import { BehaviorSubject } from 'rxjs';
import { COLOR_THEME_SERVICE_CONFIG } from '@Features/color-theme/_configs/color-theme-service.config';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private readonly isDarkThemeSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeTheme();
  }

  get isDarkTheme(): boolean {
    return this.isDarkThemeSubject.getValue();
  }

  set isDarkTheme(value: boolean) {
    this.isDarkThemeSubject.next(value);
    this.setSavedTheme(value ? ColorTheme.DARK : ColorTheme.LIGHT);
  }

  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();

    this.isDarkTheme = (savedTheme ?? this.getUserPreferredTheme()) === ColorTheme.DARK;
    this.loadTheme(this.isDarkTheme ? ColorTheme.DARK : ColorTheme.LIGHT);
  }

  private getSavedTheme(): string | null {
    return localStorage.getItem(COLOR_THEME_SERVICE_CONFIG.localStorageThemeKey);
  }

  private setSavedTheme(theme: ColorTheme): void {
    localStorage.setItem(COLOR_THEME_SERVICE_CONFIG.localStorageThemeKey, theme);
    this.loadTheme(theme);
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

  private getUserPreferredTheme(): ColorTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? ColorTheme.DARK : ColorTheme.LIGHT;
  }
}
