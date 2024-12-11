import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { Route } from '@angular/router';

const DASHBOARD_LAYOUT = () =>
  import('@Layouts/dashboard-layout/dashboard-layout.component').then((m) => m.DashboardLayoutComponent);
const HISTORY_PAGE = () =>
  import('@Pages/dashboard/history-page/history-page.component').then((m) => m.HistoryPageComponent);

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Dashboard.Root,
    loadComponent: DASHBOARD_LAYOUT,
    children: [
      {
        path: APP_ROUTES_CONFIG.Dashboard.History,
        loadComponent: HISTORY_PAGE,
        title: 'History',
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        redirectTo: APP_ROUTES_CONFIG.Dashboard.History,
        pathMatch: 'full',
      },
    ],
  },
];
