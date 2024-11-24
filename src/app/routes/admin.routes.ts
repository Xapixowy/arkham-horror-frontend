import {Route} from '@angular/router';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {adminGuard} from '@Guards/activate-children/admin.guard';
import {AdminLayoutComponent} from '@Layouts/admin-layout/admin-layout.component';

const ADMIN_PAGE = () => import('@Pages/auth/login-page/login-page.component').then((m) => m.LoginPageComponent);
const CARDS_PAGE = () => import('@Pages/admin/cards-page/cards-page.component').then((m) => m.CardsPageComponent);
const CHARACTERS_PAGE = () => import('@Pages/admin/characters-page/characters-page.component').then((m) => m.CharactersPageComponent);

export const ADMIN_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Admin.Root,
    component: AdminLayoutComponent,
    canActivateChild: [adminGuard],
    children: [
      {
        path: APP_ROUTES_CONFIG.Admin.Cards.Root,
        title: 'Cards',
        loadComponent: CARDS_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Admin.Characters.Root,
        title: 'Characters',
        loadComponent: CHARACTERS_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Admin.GameSessions.Root,
        title: 'Game sessions',
        loadComponent: ADMIN_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        title: 'Admin',
        loadComponent: ADMIN_PAGE,
      },
    ],
  },
];
