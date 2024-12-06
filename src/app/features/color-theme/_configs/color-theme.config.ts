import {tablerMoon, tablerSun} from '@ng-icons/tabler-icons';
import {ColorTheme} from '@Features/color-theme/_enums/color-theme.enum';
import {SwitcherOption} from '@Features/color-theme/_types/switcher-option.type';

export const COLOR_THEME_CONFIG: {
  localStorageThemeKey: string;
  lightThemeCssFilename: string;
  darkThemeCssFilename: string;
  switcherOptions: SwitcherOption[];
  switcherIcons: Record<string, string>;
} = {
  localStorageThemeKey: 'theme',
  lightThemeCssFilename: 'theme-aura-noir-light.css',
  darkThemeCssFilename: 'theme-aura-noir-dark.css',
  switcherOptions: [
    {
      value: ColorTheme.DARK,
      icon: 'tablerMoon'
    },
    {
      value: ColorTheme.LIGHT,
      icon: 'tablerSun'
    }
  ],
  switcherIcons: {
    tablerMoon,
    tablerSun
  }
};
