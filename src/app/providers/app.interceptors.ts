import { HttpInterceptorFn } from '@angular/common/http';
import { languageInterceptor } from '@Interceptors/language.interceptor';

export const APP_INTERCEPTORS: HttpInterceptorFn[] = [languageInterceptor];
