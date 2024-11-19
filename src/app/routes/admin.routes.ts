import { Route } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { AuthLayoutComponent as AdminLayoutComponent } from '@Layouts/auth-layout/auth-layout.component';
import { adminGuard } from '@Guards/activate-children/admin.guard';

const ADMIN_PAGE = () => import('@Pages/auth/login-page/login-page.component').then((m) => m.LoginPageComponent);

export const ADMIN_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Admin.Root,
    component: AdminLayoutComponent,
    canActivateChild: [adminGuard],
    children: [
      {
        path: APP_ROUTES_CONFIG.Blank,
        title: 'Admin',
        loadComponent: ADMIN_PAGE,
      },
    ],
  },
];
