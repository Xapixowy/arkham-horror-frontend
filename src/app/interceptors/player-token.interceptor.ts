import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@Services/local-storage.service';

export const playerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);

  if (!localStorageService.player) {
    return next(req);
  }

  const newRequest = req.clone({
    setHeaders: {
      'Player-Token': localStorageService.player.token,
    },
  });

  return next(newRequest);
};
