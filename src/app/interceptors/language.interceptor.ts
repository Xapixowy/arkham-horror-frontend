import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@Services/local-storage.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);

  const newRequest = req.clone({
    setHeaders: {
      'Accept-Language': localStorageService.language,
    },
  });

  return next(newRequest);
};
