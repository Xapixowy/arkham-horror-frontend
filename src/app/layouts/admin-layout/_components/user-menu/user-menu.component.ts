import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { UserAvatarComponent } from '@Components/user-avatar/user-avatar.component';
import { User } from '@Models/user.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserMenuAction } from '@Layouts/admin-layout/_types/user-menu-action.type';
import { USER_MENU_CONFIG } from '@Layouts/admin-layout/_configs/user-menu.config';
import { UserMenuActionId } from '@Layouts/admin-layout/_enums/user-menu-action-id.enum';
import { LocalStorageService } from '@Services/local-storage.service';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { WindowEvent } from '@Enums/window-event.enum';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [UserAvatarComponent, OverlayPanelModule, TranslocoPipe, NgIcon],
  providers: [provideIcons(USER_MENU_CONFIG.icons)],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);

  readonly user = input.required<User>();

  protected readonly actions = signal<UserMenuAction[]>(USER_MENU_CONFIG.actions);

  ngOnInit() {
    this.overrideLogoutActionFunction();
    this.listenForLogoutUserEvent();
  }

  private overrideLogoutActionFunction(): void {
    const logoutAction = this.actions().find((action) => action.id === UserMenuActionId.LOGOUT);

    if (logoutAction) {
      logoutAction.action = () => this.logoutActionFunction();
    }

    this.actions.set(this.actions());
  }

  private listenForLogoutUserEvent(): void {
    window.addEventListener(WindowEvent.LOGOUT_USER, () => {
      this.logoutActionFunction();
    });
  }

  private logoutActionFunction(): void {
    this.localStorageService.user = null;
    this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]);
  }
}
