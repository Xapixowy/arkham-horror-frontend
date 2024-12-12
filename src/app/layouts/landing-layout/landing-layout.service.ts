import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { NavigationSection } from '@Layouts/landing-layout/_types/navigation-section.type';
import { NavigationSection as NavigationSectionEnum } from '@Layouts/landing-layout/_enums/navigation-section.enum';
import { LANDING_LAYOUT_CONFIG } from '@Layouts/landing-layout/_configs/landing-layout.config';
import { LocalStorageService } from '@Services/local-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@Models/user.model';
import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { USER_MENU_CONFIG } from '@Layouts/landing-layout/_configs/user-menu.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LandingLayoutService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly userMenuConfig = signal<UserMenuConfig>(USER_MENU_CONFIG);
  readonly isNavigationShown = signal<boolean>(false);
  readonly navigationSections = signal<NavigationSection[]>(LANDING_LAYOUT_CONFIG.navigation);
  readonly loggedInNotAdminUser = signal<User | null>(null);

  constructor() {
    this.listenForUserChanges();
  }

  toggleNavigation(): void {
    this.isNavigationShown.set(!this.isNavigationShown());
  }

  private listenForUserChanges(): void {
    this.localStorageService.userSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      if (user) {
        this.navigationSections.update((sections) => this.hideSectionsIfUserLoggedIn(sections, user));
        this.loggedInNotAdminUser.set(user);
        return;
      }
      this.navigationSections.set(LANDING_LAYOUT_CONFIG.navigation);
      this.loggedInNotAdminUser.set(null);
    });
  }

  private hideSectionsIfUserLoggedIn(sections: NavigationSection[], user: User | null): NavigationSection[] {
    return sections.map((section) => {
      if (section.id === NavigationSectionEnum.AUTH_BUTTONS) {
        return {
          ...section,
          items: section.items.map((item) => ({
            ...item,
            hide: !!user,
          })),
        };
      }
      if (section.id === NavigationSectionEnum.DASHBOARD_LINKS) {
        return {
          ...section,
          items: section.items.map((item) => ({
            ...item,
            hide: !user,
          })),
        };
      }
      return section;
    });
  }
}
