import {APP_ROUTES_CONFIG} from '@Configs/routes.config';

const LANDING_PAGE = () => import('@Pages/landing/landing.component').then(m => m.LandingComponent);

export const LANDING_ROUTES = [
  {
    path: APP_ROUTES_CONFIG.Landing,
    loadComponent: LANDING_PAGE,
    title: 'Landing'
  }
]
