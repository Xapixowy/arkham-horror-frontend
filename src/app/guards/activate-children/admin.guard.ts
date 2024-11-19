import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '@Services/local-storage.service';
import { inject } from '@angular/core';
import { UserRole } from '@Enums/user/user-role.enum';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.user?.role === UserRole.ADMIN) {
    return true;
  }

  router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]);
  return false;
};
