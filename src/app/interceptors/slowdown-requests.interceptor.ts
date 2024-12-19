import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';
import { ENVIRONMENT } from '@Environments/environment';

export const slowdownRequestsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(ENVIRONMENT.api_url)) {
    return next(req).pipe(delay(1000));
  }
  return next(req);
};
