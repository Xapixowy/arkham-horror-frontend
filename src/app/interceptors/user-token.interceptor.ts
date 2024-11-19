import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {LocalStorageService} from '@Services/local-storage.service';

export const userTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);

  if (!localStorageService.user) {
    return next(req);
  }

  const newRequest = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${localStorageService.user.access_token}`,
    },
  });

  return next(newRequest);
};
