import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ColorThemeSwitcherComponent } from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import { LanguageSwitcherComponent } from '@Features/language/_components/language-switcher/language-switcher.component';
import { HamburgerMenuComponent } from '@Components/hamburger-menu/hamburger-menu.component';
import { LandingLayoutService } from '@Layouts/landing-layout/landing-layout.service';
import { NgTemplateOutlet } from '@angular/common';
import { NavigationSection } from '@Layouts/landing-layout/_types/navigation-section.type';
import { UserAvatarComponent } from '@Components/user-avatar/user-avatar.component';
import { UserMenuComponent } from '@Components/user-menu/user-menu.component';
import { USER_MENU_CONFIG } from '@Layouts/landing-layout/_configs/user-menu.config';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    TranslocoPipe,
    Button,
    RouterLink,
    ColorThemeSwitcherComponent,
    LanguageSwitcherComponent,
    HamburgerMenuComponent,
    NgTemplateOutlet,
    UserAvatarComponent,
    UserMenuComponent,
  ],
  providers: [provideIcons(USER_MENU_CONFIG.icons)],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private readonly landingLayoutService = inject(LandingLayoutService);

  protected readonly userMenuConfig = this.landingLayoutService.userMenuConfig;
  protected readonly isNavigationShown = this.landingLayoutService.isNavigationShown;
  protected readonly loggedInNotAdminUser = this.landingLayoutService.loggedInNotAdminUser;

  protected readonly leftNavigationSections = computed<NavigationSection[]>(() =>
    this.filterHiddenNavigationItems(
      this.landingLayoutService.navigationSections().filter((section) => section.position === 'left'),
    ),
  );
  protected readonly rightNavigationSections = computed<NavigationSection[]>(() =>
    this.filterHiddenNavigationItems(
      this.landingLayoutService.navigationSections().filter((section) => section.position === 'right'),
    ),
  );

  toggleNavigation(): void {
    this.landingLayoutService.toggleNavigation();
  }

  private filterHiddenNavigationItems(sections: NavigationSection[]): NavigationSection[] {
    return sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.hide),
    }));
  }
}
