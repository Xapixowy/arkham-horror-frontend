import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '@Services/local-storage.service';
import { inject } from '@angular/core';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

export const gameGuard: CanActivateChildFn = () => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.gameSession) {
    return true;
  }

  router.navigate([APP_ROUTES_CONFIG.Default]);
  return false;
};
