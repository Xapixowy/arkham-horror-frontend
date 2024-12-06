import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {
  ColorThemeSwitcherComponent
} from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import {LanguageSwitcherComponent} from '@Features/language/_components/language-switcher/language-switcher.component';
import {TranslocoPipe} from '@jsverse/transloco';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, ColorThemeSwitcherComponent, LanguageSwitcherComponent, TranslocoPipe, RouterLink],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
}
