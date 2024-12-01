import {Route} from '@angular/router';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {adminGuard} from '@Guards/activate-children/admin.guard';
import {AdminLayoutComponent} from '@Layouts/admin-layout/admin-layout.component';

const CARDS_PAGE = () => import('@Pages/admin/cards-page/cards-page.component').then((m) => m.CardsPageComponent);
const CHARACTERS_PAGE = () => import('@Pages/admin/characters-page/characters-page.component').then((m) => m.CharactersPageComponent);
const GAME_SESSIONS_PAGE = () => import('@Pages/admin/game-sessions-page/game-sessions-page.component').then((m) => m.GameSessionsPageComponent);

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
        loadComponent: GAME_SESSIONS_PAGE,
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        redirectTo: APP_ROUTES_CONFIG.Admin.Cards.Root,
        pathMatch: 'full',
      },
    ],
  },
];
