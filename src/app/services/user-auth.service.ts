import { DestroyRef, inject, Injectable } from '@angular/core';
import { AuthService } from '@Services/http/auth.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { Router } from '@angular/router';
import { WindowEvent } from '@Enums/window-event.enum';
import { UserMenuComponent } from '@Components/user-menu/user-menu.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private readonly authService = inject(AuthService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.listenForLogoutUserEvent();
    this.checkIfUserIsLoggedIn();
  }

  private listenForLogoutUserEvent(): void {
    window.addEventListener(WindowEvent.LOGOUT_USER, () => {
      UserMenuComponent.logoutActionFunction(this.localStorageService, this.router);
    });
  }

  private checkIfUserIsLoggedIn(): void {
    const isUserLoggedIn = !!this.localStorageService.user;

    if (!isUserLoggedIn) {
      return;
    }

    this.authService.me().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
