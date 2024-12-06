import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ColorThemeService} from '../../../color-theme/_services/color-theme.service';
import {FormsModule} from '@angular/forms';
import {SelectButtonChangeEvent, SelectButtonModule} from 'primeng/selectbutton';
import {COLOR_THEME_CONFIG} from '@Features/color-theme/_configs/color-theme.config';
import {SwitcherOption} from '@Features/color-theme/_types/switcher-option.type';

@Component({
  selector: 'app-color-theme-switcher',
  standalone: true,
  imports: [NgIcon, InputSwitchModule, FormsModule, SelectButtonModule],
  providers: [
    provideIcons(COLOR_THEME_CONFIG.switcherIcons),
  ],
  templateUrl: './color-theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeSwitcherComponent {
  private readonly themeSwitcherService = inject(ColorThemeService);

  protected switcherOptions = COLOR_THEME_CONFIG.switcherOptions;
  protected readonly switcherOption = this.themeSwitcherService.switcherOption;

  onChange(event: SelectButtonChangeEvent): void {
    this.themeSwitcherService.colorTheme = event.value as SwitcherOption;
  }
}
