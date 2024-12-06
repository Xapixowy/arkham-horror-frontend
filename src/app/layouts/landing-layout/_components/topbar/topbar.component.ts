import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslocoPipe} from "@jsverse/transloco";
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {
  ColorThemeSwitcherComponent
} from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import {LanguageSwitcherComponent} from '@Features/language/_components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    TranslocoPipe,
    Button,
    RouterLink,
    ColorThemeSwitcherComponent,
    LanguageSwitcherComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
}
