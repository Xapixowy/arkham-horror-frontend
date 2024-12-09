import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { Route } from '@angular/router';
import { LandingLayoutComponent } from '@Layouts/landing-layout/landing-layout.component';

const LANDING_PAGE = () =>
  import('@Pages/landing/landing-page/landing-page.component').then((m) => m.LandingPageComponent);
const HISTORY_PAGE = () =>
  import('@Pages/dashboard/history-page/history-page.component').then((m) => m.HistoryPageComponent);

export const LANDING_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Landing,
    component: LandingLayoutComponent,
    children: [
      {
        path: `${APP_ROUTES_CONFIG.Dashboard.Root}/${APP_ROUTES_CONFIG.Dashboard.History}`,
        loadComponent: HISTORY_PAGE,
        title: 'History',
      },
      {
        path: APP_ROUTES_CONFIG.Dashboard.Root,
        redirectTo: `${APP_ROUTES_CONFIG.Dashboard.Root}/${APP_ROUTES_CONFIG.Dashboard.History}`,
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        loadComponent: LANDING_PAGE,
        title: 'Landing',
      },
    ],
  },
];
