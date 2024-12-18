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
import { UserRole } from '@Enums/users/user-role.enum';
import { selectGameSession, selectPlayer } from '@States/game/game.selectors';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LandingLayoutService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly userMenuConfig = signal<UserMenuConfig>(USER_MENU_CONFIG);
  readonly isNavigationShown = signal<boolean>(false);
  readonly navigationSections = signal<NavigationSection[]>(LANDING_LAYOUT_CONFIG.navigation);
  readonly loggedInNotAdminUser = signal<User | null>(null);

  constructor() {
    this.listenForLocalStorageUserChanges();
    this.listenForLocalStorageGameSessionTokenChanges();
    this.listenToStorageGameSessionChanges();
    this.listenToStoragePlayerChanges();
  }

  toggleNavigation(): void {
    this.isNavigationShown.set(!this.isNavigationShown());
  }

  private listenForLocalStorageUserChanges(): void {
    this.localStorageService.userSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.userMenuConfig.set(this.hideUserMenuSectionsIfUserNotAdmin(user));
      if (user) {
        this.navigationSections.update((sections) => this.hideSectionsIfUserLoggedIn(sections, user));
        this.loggedInNotAdminUser.set(user);
        return;
      }
      this.userMenuConfig.set(USER_MENU_CONFIG);
      this.navigationSections.set(LANDING_LAYOUT_CONFIG.navigation);
      this.loggedInNotAdminUser.set(null);
    });
  }

  private listenForLocalStorageGameSessionTokenChanges(): void {
    this.localStorageService.gameSessionTokenSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((token) => {
      this.navigationSections.update((sections) => this.hideSectionsIfGameSessionDoesNotExist(sections, token));
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

  private hideSectionsIfGameSessionDoesNotExist(
    sections: NavigationSection[],
    gameSessionToken: string | null,
  ): NavigationSection[] {
    return sections.map((section) => {
      if (section.id === NavigationSectionEnum.GAME_LINKS) {
        return {
          ...section,
          items: section.items.map((item) => ({
            ...item,
            hide: !gameSessionToken,
          })),
        };
      }
      return section;
    });
  }

  private hideUserMenuSectionsIfUserNotAdmin(user: User | null): UserMenuConfig {
    const isAdmin = user?.role === UserRole.ADMIN;

    return {
      ...USER_MENU_CONFIG,
      actions: USER_MENU_CONFIG.actions.map((action) => {
        if (action.id === UserMenuActionId.ADMIN_DASHBOARD) {
          return {
            ...action,
            hide: !isAdmin,
          };
        }
        return action;
      }),
    };
  }

  private listenToStorageGameSessionChanges(): void {
    this.store
      .select(selectGameSession)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (!value) {
          return;
        }

        this.localStorageService.gameSessionToken = value.token;

        const isLandingPage = this.router.url === APP_ROUTES_CONFIG.Default;

        if (isLandingPage) {
          this.router.navigate([
            APP_ROUTES_CONFIG.Default,
            APP_ROUTES_CONFIG.Game.Root,
            APP_ROUTES_CONFIG.Game.Character,
          ]);
        }
      });
  }

  private listenToStoragePlayerChanges(): void {
    this.store
      .select(selectPlayer)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (!value) {
          return;
        }

        this.localStorageService.playerToken = value.token;
      });
  }
}
