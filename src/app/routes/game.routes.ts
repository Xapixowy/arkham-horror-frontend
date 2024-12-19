import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { Route } from '@angular/router';
import { gameGuard } from '@Guards/activate-children/game.guard';

const GAME_LAYOUT = () => import('@Layouts/game-layout/game-layout.component').then((m) => m.GameLayoutComponent);

const CHARACTER_PAGE = () =>
  import('@Pages/game/character-page/character-page.component').then((m) => m.CharacterPageComponent);
const PLAYERS_PAGE = () =>
  import('@Pages/game/players-page/players-page.component').then((m) => m.PlayersPageComponent);

export const GAME_ROUTES: Route[] = [
  {
    path: APP_ROUTES_CONFIG.Game.Root,
    loadComponent: GAME_LAYOUT,
    canActivateChild: [gameGuard],
    children: [
      {
        path: APP_ROUTES_CONFIG.Game.Character,
        loadComponent: CHARACTER_PAGE,
        title: 'Character',
      },
      {
        path: APP_ROUTES_CONFIG.Game.Equipment,
        loadComponent: CHARACTER_PAGE,
        title: 'Equipment',
      },
      {
        path: APP_ROUTES_CONFIG.Game.Players,
        loadComponent: PLAYERS_PAGE,
        title: 'Players',
      },
      {
        path: APP_ROUTES_CONFIG.Blank,
        redirectTo: APP_ROUTES_CONFIG.Game.Character,
        pathMatch: 'full',
      },
    ],
  },
];
