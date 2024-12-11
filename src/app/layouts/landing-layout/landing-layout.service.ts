import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { NavigationSection } from '@Layouts/landing-layout/_types/navigation-section.type';
import { NavigationSection as NavigationSectionEnum } from '@Layouts/landing-layout/_enums/navigation-section.enum';
import { LANDING_LAYOUT_CONFIG } from '@Layouts/landing-layout/_configs/landing-layout.config';
import { LocalStorageService } from '@Services/local-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@Models/user.model';
import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { USER_MENU_CONFIG } from '@Layouts/landing-layout/_configs/user-menu.config';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

@Injectable({
  providedIn: 'root',
})
export class LandingLayoutService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly userMenuConfig = signal<UserMenuConfig>(this.generateUserMenuConfig());
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

  private generateUserMenuConfig(): UserMenuConfig {
    return {
      ...USER_MENU_CONFIG,
      actions: USER_MENU_CONFIG.actions.map((action) => {
        if (action.id === UserMenuActionId.DASHBOARD) {
          return {
            ...action,
            action: () => this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Dashboard.Root]),
          };
        }
        return action;
      }),
    };
  }
}
