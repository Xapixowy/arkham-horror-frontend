import { Route } from '@angular/router';
import { AUTH_ROUTES } from '@Routes/auth.routes';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { LANDING_ROUTES } from '@Routes/landing.routes';
import { ADMIN_ROUTES } from '@Routes/admin.routes';

export const APP_ROUTES: Route[] = [
  ...LANDING_ROUTES,
  ...AUTH_ROUTES,
  ...ADMIN_ROUTES,
  {
    path: APP_ROUTES_CONFIG.Blank,
    redirectTo: APP_ROUTES_CONFIG.Landing,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES_CONFIG.Wildcard,
    redirectTo: APP_ROUTES_CONFIG.Blank,
  },
];
