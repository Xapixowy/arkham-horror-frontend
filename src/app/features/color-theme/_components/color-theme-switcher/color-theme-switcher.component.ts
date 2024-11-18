import {Component, inject, signal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerMoon} from '@ng-icons/tabler-icons';
import {InputSwitchChangeEvent, InputSwitchModule} from 'primeng/inputswitch';
import {ColorThemeService} from '../../../color-theme/_services/color-theme.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-color-theme-switcher',
  standalone: true,
  imports: [
    NgIcon,
    InputSwitchModule,
    FormsModule
  ],
  providers: [
    provideIcons({
      tablerMoon
    })
  ],
  templateUrl: './color-theme-switcher.component.html',
  styleUrl: './color-theme-switcher.component.scss'
})
export class ColorThemeSwitcherComponent {
  protected readonly themeSwitcherService = inject(ColorThemeService)

  protected readonly isDarkTheme = signal<boolean>(false);

  constructor() {
    this.isDarkTheme.set(this.themeSwitcherService.isDarkTheme)
  }

  onChange(value: InputSwitchChangeEvent): void {
    this.themeSwitcherService.isDarkTheme = value.checked
  }
}
