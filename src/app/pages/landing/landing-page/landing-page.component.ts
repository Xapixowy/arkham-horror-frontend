import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  ColorThemeSwitcherComponent
} from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import {LanguageSwitcherComponent} from '@Features/language/_components/language-switcher/language-switcher.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerBrandGithub} from '@ng-icons/tabler-icons';
import {NgOptimizedImage} from '@angular/common';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ColorThemeSwitcherComponent,
    LanguageSwitcherComponent,
    NgIcon,
    NgOptimizedImage,
    TranslocoPipe
  ],
  providers: [provideIcons({
    tablerBrandGithub
  })],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  readonly currentYear = new Date().getFullYear();
}
