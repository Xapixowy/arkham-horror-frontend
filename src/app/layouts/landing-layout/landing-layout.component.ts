import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '@Layouts/landing-layout/_components/navigation/navigation.component';
import { LandingLayoutService } from '@Layouts/landing-layout/landing-layout.service';
import { ColorThemeSwitcherComponent } from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import { LanguageSwitcherComponent } from '@Features/language/_components/language-switcher/language-switcher.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerBrandGithub } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet, ColorThemeSwitcherComponent, LanguageSwitcherComponent, NgIcon],
  providers: [
    LandingLayoutService,
    provideIcons({
      tablerBrandGithub,
    }),
  ],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingLayoutComponent {
  readonly currentYear = new Date().getFullYear();
}
