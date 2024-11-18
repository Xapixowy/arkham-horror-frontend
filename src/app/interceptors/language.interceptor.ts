import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '@Features/language/_services/language.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const languageService = inject(LanguageService);
  const userLanguage = languageService.language;

  const newRequest = req.clone({
    setHeaders: {
      'Accept-Language': userLanguage,
    },
  });
  req.headers.set('Accept-Language', userLanguage);

  return next(newRequest);
};
