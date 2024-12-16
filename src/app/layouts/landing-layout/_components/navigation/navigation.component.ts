import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { HamburgerMenuComponent } from '@Components/hamburger-menu/hamburger-menu.component';
import { LandingLayoutService } from '@Layouts/landing-layout/landing-layout.service';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NavigationSection } from '@Layouts/landing-layout/_types/navigation-section.type';
import { UserMenuComponent } from '@Components/user-menu/user-menu.component';
import { USER_MENU_CONFIG } from '@Layouts/landing-layout/_configs/user-menu.config';
import { provideIcons } from '@ng-icons/core';
import { LogoComponent } from '@Components/logo/logo.component';
import { NavigationItem } from '@Layouts/landing-layout/_types/navigation-item.type';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [TranslocoPipe, Button, HamburgerMenuComponent, NgTemplateOutlet, UserMenuComponent, LogoComponent, NgClass],
  providers: [provideIcons(USER_MENU_CONFIG.icons)],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private readonly router = inject(Router);
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

  onNavigationItemClick(item: NavigationItem): void {
    if ('routerLink' in item) {
      this.router.navigate(item.routerLink);
    } else {
      item.action();
    }

    this.hideNavigation();
  }

  hideNavigation(): void {
    this.landingLayoutService.isNavigationShown.set(false);
  }

  private filterHiddenNavigationItems(sections: NavigationSection[]): NavigationSection[] {
    return sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.hide),
    }));
  }
}
