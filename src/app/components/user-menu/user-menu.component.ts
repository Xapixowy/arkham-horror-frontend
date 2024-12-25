import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { User } from '@Models/user.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserMenuAction } from '@Components/user-menu/_types/user-menu-action.type';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { LocalStorageService } from '@Services/local-storage.service';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon } from '@ng-icons/core';
import { UserAvatarComponent } from '@Components/user-avatar/user-avatar.component';
import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [OverlayPanelModule, TranslocoPipe, NgIcon, UserAvatarComponent, Button],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);

  readonly user = input.required<User>();
  readonly config = input.required<UserMenuConfig>();
  readonly isNameShown = input<boolean>(false);

  protected readonly actions = computed<UserMenuAction[]>(() => {
    const actionsWithoutHidden = this.config().actions.filter((action) => !action.hide);
    return this.overrideActionFunctions(actionsWithoutHidden);
  });

  private overrideActionFunctions(actions: UserMenuAction[]): UserMenuAction[] {
    return actions.map((action) => {
      if (action.id === UserMenuActionId.LOGOUT) {
        return {
          ...action,
          action: () => UserMenuComponent.logoutActionFunction(this.localStorageService, this.router),
        };
      }
      if (action.id === UserMenuActionId.ADMIN_DASHBOARD) {
        return {
          ...action,
          action: () => this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root]),
        };
      }
      return action;
    });
  }

  static logoutActionFunction(localStorageService: LocalStorageService, router: Router): void {
    localStorageService.user = null;
    localStorageService.gameSessionToken = null;
    localStorageService.playerToken = null;
    router.navigate([APP_ROUTES_CONFIG.Default]);
  }
}
