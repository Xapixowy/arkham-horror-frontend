import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {WindowEvent} from '@Enums/window-event.enum';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
          case 403:
            window.dispatchEvent(new Event(WindowEvent.LOGOUT_USER));
            break;
        }
      }
      return throwError(() => error);
    }),
  );
};
