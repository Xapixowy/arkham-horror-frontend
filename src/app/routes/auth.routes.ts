import {Route} from '@angular/router';
import {AuthLayoutComponent} from '@Layouts/auth-layout/auth-layout.component';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';

const REGISTER_PAGE = () => import('@Pages/auth/register/register.component').then(m => m.RegisterComponent);

export const AUTH_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Auth.Root,
    component: AuthLayoutComponent,
    children: [
      {
        path: APP_ROUTES_CONFIG.Auth.Register,
        title: 'Register',
        loadComponent: REGISTER_PAGE
      },
      {
        path: APP_ROUTES_CONFIG.Auth.Verify.Root,
        title: 'Verify',
        children: [
          {
            path: APP_ROUTES_CONFIG.Auth.Verify.Page,
            loadComponent: REGISTER_PAGE
          }
        ]
      },
      {
        path: APP_ROUTES_CONFIG.Auth.Login,
        title: 'Login',
        loadComponent: REGISTER_PAGE
      },
      {
        path: APP_ROUTES_CONFIG.Auth.RemindPassword,
        title: 'Remind password',
        loadComponent: REGISTER_PAGE
      },
      {
        path: APP_ROUTES_CONFIG.Auth.ResetPassword.Root,
        title: 'Reset password',
        children: [
          {
            path: APP_ROUTES_CONFIG.Auth.ResetPassword.Page,
            loadComponent: REGISTER_PAGE
          }
        ]
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        redirectTo: APP_ROUTES_CONFIG.Auth.Login,
        pathMatch: 'full',
      }
    ]
  }
]
