import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { User } from '@Models/user.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserMenuAction } from '@Components/user-menu/_types/user-menu-action.type';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { LocalStorageService } from '@Services/local-storage.service';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon } from '@ng-icons/core';
import { WindowEvent } from '@Enums/window-event.enum';
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
export class UserMenuComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);

  readonly user = input.required<User>();
  readonly config = input.required<UserMenuConfig>();
  readonly isNameShown = input<boolean>(false);

  protected readonly actions = computed<UserMenuAction[]>(() => {
    const actionsWithoutHidden = this.config().actions.filter((action) => !action.hide);
    return this.overrideActionFunctions(actionsWithoutHidden);
  });

  ngOnInit() {
    this.listenForLogoutUserEvent();
  }

  private overrideActionFunctions(actions: UserMenuAction[]): UserMenuAction[] {
    return actions.map((action) => {
      if (action.id === UserMenuActionId.LOGOUT) {
        return {
          ...action,
          action: () => this.logoutActionFunction(),
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

  private listenForLogoutUserEvent(): void {
    window.addEventListener(WindowEvent.LOGOUT_USER, () => {
      this.logoutActionFunction();
    });
  }

  private logoutActionFunction(): void {
    this.localStorageService.user = null;
    this.router.navigate([APP_ROUTES_CONFIG.Default]);
  }
}
