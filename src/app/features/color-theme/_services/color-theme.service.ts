import { inject, Injectable, signal } from '@angular/core';
import { ColorTheme } from '../../color-theme/_enums/color-theme.enum';
import { COLOR_THEME_CONFIG } from '@Features/color-theme/_configs/color-theme.config';
import { LocalStorageService } from '@Services/local-storage.service';
import { SwitcherOption } from '@Features/color-theme/_types/switcher-option.type';

const DARK_THEME_OPTION = COLOR_THEME_CONFIG.switcherOptions.find((option) => option.value === ColorTheme.DARK);
const LIGHT_THEME_OPTION = COLOR_THEME_CONFIG.switcherOptions.find((option) => option.value === ColorTheme.LIGHT);

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private readonly localStorageService = inject(LocalStorageService);

  readonly switcherOption = signal<SwitcherOption>(COLOR_THEME_CONFIG.switcherOptions[0]);

  constructor() {
    this.subscribeToThemeChanges();
  }

  get colorTheme(): SwitcherOption {
    return this.localStorageService.colorTheme === ColorTheme.DARK ? DARK_THEME_OPTION! : LIGHT_THEME_OPTION!;
  }

  set colorTheme(option: SwitcherOption) {
    this.localStorageService.colorTheme = option.value;
  }

  private subscribeToThemeChanges(): void {
    this.localStorageService.colorThemeSubject.subscribe((theme) => {
      this.switcherOption.set(theme === ColorTheme.DARK ? DARK_THEME_OPTION! : LIGHT_THEME_OPTION!);
      document.body.classList.toggle('dark', theme === ColorTheme.DARK);
      document.body.classList.toggle('light', theme === ColorTheme.LIGHT);
      this.loadTheme(theme);
    });
  }

  private loadTheme(theme: ColorTheme): void {
    const cssLink = document.getElementById('app-theme') as HTMLLinkElement | undefined;

    if (cssLink) {
      cssLink.href =
        theme === ColorTheme.DARK ? COLOR_THEME_CONFIG.darkThemeCssFilename : COLOR_THEME_CONFIG.lightThemeCssFilename;
    }
  }
}
