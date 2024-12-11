import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { Route } from '@angular/router';
import { LandingLayoutComponent } from '@Layouts/landing-layout/landing-layout.component';
import { DASHBOARD_ROUTES } from '@Routes/dashboard.routes';

const LANDING_PAGE = () =>
  import('@Pages/landing/landing-page/landing-page.component').then((m) => m.LandingPageComponent);

export const LANDING_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Landing,
    component: LandingLayoutComponent,
    children: [
      ...DASHBOARD_ROUTES,
      {
        path: APP_ROUTES_CONFIG.Blank,
        loadComponent: LANDING_PAGE,
        title: 'Landing',
      },
    ],
  },
];
