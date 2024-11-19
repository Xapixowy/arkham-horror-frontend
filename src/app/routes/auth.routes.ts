import { Route } from '@angular/router';
import { AuthLayoutComponent } from '@Layouts/auth-layout/auth-layout.component';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

const REGISTER_PAGE = () =>
  import('@Pages/auth/register-page/register-page.component').then((m) => m.RegisterPageComponent);
const VERIFY_PAGE = () => import('@Pages/auth/verify-page/verify-page.component').then((m) => m.VerifyPageComponent);
const LOGIN_PAGE = () => import('@Pages/auth/login-page/login-page.component').then((m) => m.LoginPageComponent);
const REMIND_PASSWORD_PAGE = () =>
  import('@Pages/auth/remind-password-page/remind-password-page.component').then((m) => m.RemindPasswordPageComponent);
const RESET_PASSWORD_PAGE = () =>
  import('@Pages/auth/reset-password-page/reset-password-page.component').then((m) => m.ResetPasswordPageComponent);

export const AUTH_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Auth.Root,
    component: AuthLayoutComponent,
    children: [
      {
        path: APP_ROUTES_CONFIG.Auth.Register,
        title: 'Registration',
        loadComponent: REGISTER_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Auth.Verify.Root,
        title: 'Verification',
        children: [
          {
            path: APP_ROUTES_CONFIG.Auth.Verify.Page,
            loadComponent: VERIFY_PAGE,
          },
        ],
      },
      {
        path: APP_ROUTES_CONFIG.Auth.Login,
        title: 'Login',
        loadComponent: LOGIN_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Auth.RemindPassword,
        title: 'Remind password',
        loadComponent: REMIND_PASSWORD_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Auth.ResetPassword.Root,
        title: 'Reset password',
        children: [
          {
            path: APP_ROUTES_CONFIG.Auth.ResetPassword.Page,
            loadComponent: RESET_PASSWORD_PAGE,
          },
        ],
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        redirectTo: APP_ROUTES_CONFIG.Auth.Login,
        pathMatch: 'full',
      },
    ],
  },
];
