import {HttpInterceptorFn} from '@angular/common/http';
import {languageInterceptor} from '@Interceptors/language.interceptor';
import {authErrorInterceptor} from '@Interceptors/auth-error.interceptor';
import {userTokenInterceptor} from '@Interceptors/user-token.interceptor';

export const APP_INTERCEPTORS: HttpInterceptorFn[] = [languageInterceptor, authErrorInterceptor, userTokenInterceptor];
