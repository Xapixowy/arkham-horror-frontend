import { HttpInterceptorFn } from '@angular/common/http';
import { languageInterceptor } from '@Interceptors/language.interceptor';
import { authErrorInterceptor } from '@Interceptors/auth-error.interceptor';
import { userTokenInterceptor } from '@Interceptors/user-token.interceptor';
import { playerTokenInterceptor } from '@Interceptors/player-token.interceptor';
import { slowdownRequestsInterceptor } from '@Interceptors/slowdown-requests.interceptor';

export const APP_INTERCEPTORS: HttpInterceptorFn[] = [
  languageInterceptor,
  authErrorInterceptor,
  userTokenInterceptor,
  playerTokenInterceptor,
  slowdownRequestsInterceptor,
];
