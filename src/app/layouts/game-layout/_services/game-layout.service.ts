import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { SpeedDialItem } from '@Components/speed-dial/_types/speed-dial-item.type';
import { GAME_LAYOUT_CONFIG } from '@Layouts/game-layout/_configs/game-layout.config';
import { NavigationEnd, Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { GameSpeedDialId } from '@Layouts/game-layout/_enums/game-speed-dial-id.enum';
import { WindowEvent } from '@Enums/window-event.enum';
import { Store } from '@ngrx/store';
import { selectGameSession, selectGameSessionPhase, selectPlayer } from '@States/game/game.selectors';
import { Player } from '@Models/player.model';
import { GameSession } from '@Models/game-session.model';
import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { nextGameSessionPhase, previousGameSessionPhase, resetGameSessionPhase } from '@States/game/game.actions';
import { WebsocketService } from '@Services/websocket.service';
import { WebsocketGateway } from '@Enums/websockets/websocket-gateway.enum';
import { WebsocketEvent } from '@Enums/websockets/websocket-event.enum';
import { UserRole } from '@Enums/users/user-role.enum';
import { PlayerRole } from '@Enums/players/player-role.enum';
import { LocalStorageService } from '@Services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GameLayoutService {
  private readonly websocketService = inject(WebsocketService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly speedDialItems = signal<SpeedDialItem[]>(GAME_LAYOUT_CONFIG.speedDialItems);
  readonly player = signal<Player | null>(null);
  readonly gameSession = signal<GameSession | null>(null);
  readonly gameSessionPhase = signal<GameSessionPhase | null>(null);
  readonly user = this.localStorageService.user;

  readonly player$ = this.store.select(selectPlayer);
  private readonly gameSession$ = this.store.select(selectGameSession);
  private readonly gameSessionPhase$ = this.store.select(selectGameSessionPhase);

  constructor() {
    this.listenToUrlChanges();
    this.listenToStoreChanges();
    this.setSpeedDialItems(this.router.url);
    this.websocketService.connect(WebsocketGateway.GAME_SESSION, this.gameSession()?.token);
    this.listenToWebsocketEvents();
  }

  private listenToUrlChanges(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setSpeedDialItems(event.url);
      }
    });
  }

  private setSpeedDialItems(url: string): void {
    const speedDialItemsWithHiddenItems = this.hideUnnecessarySpeedDialItems(GAME_LAYOUT_CONFIG.speedDialItems, url);
    const speedDialItemsWithActions = this.hydrateActionsToSpeedDialItems(speedDialItemsWithHiddenItems);

    this.speedDialItems.set(speedDialItemsWithActions);
  }

  private hydrateActionsToSpeedDialItems(speedDialItems: SpeedDialItem[]): SpeedDialItem[] {
    return speedDialItems.map((item) => {
      if (item.id === GameSpeedDialId.CHARACTER_DETAILS) {
        return {
          ...item,
          action: () => window.dispatchEvent(new CustomEvent(WindowEvent.GAME_CHARACTER_SHOW_DETAILS)),
        };
      }

      if (item.id === GameSpeedDialId.PLAYER_STATISTICS) {
        return {
          ...item,
          action: () => window.dispatchEvent(new CustomEvent(WindowEvent.GAME_PLAYER_STATISTICS_SHOW)),
        };
      }

      if (item.id === GameSpeedDialId.NEXT_GAME_PHASE) {
        return {
          ...item,
          action: () => this.store.dispatch(nextGameSessionPhase({ gameSessionToken: this.gameSession()!.token })),
        };
      }

      if (item.id === GameSpeedDialId.PREVIOUS_GAME_PHASE) {
        return {
          ...item,
          action: () => this.store.dispatch(previousGameSessionPhase({ gameSessionToken: this.gameSession()!.token })),
        };
      }

      if (item.id === GameSpeedDialId.RESET_GAME_PHASE) {
        return {
          ...item,
          action: () => this.store.dispatch(resetGameSessionPhase({ gameSessionToken: this.gameSession()!.token })),
        };
      }

      return item;
    });
  }

  private hideUnnecessarySpeedDialItems(speedDialItems: SpeedDialItem[], url: string): SpeedDialItem[] {
    const characterPageUrl = `${APP_ROUTES_CONFIG.Game.Root}/${APP_ROUTES_CONFIG.Game.Character}`;

    return speedDialItems.map((item) => {
      const isCharacterPage = url.includes(characterPageUrl);
      const isCharacterDetails = item.id === GameSpeedDialId.CHARACTER_DETAILS;

      if (!isCharacterPage && isCharacterDetails) {
        return {
          ...item,
          hide: true,
        };
      }

      if (this.player()?.role === PlayerRole.HOST || this.user?.role === UserRole.ADMIN) {
        return {
          ...item,
          hide: false,
        };
      }

      return item;
    });
  }

  private listenToStoreChanges(): void {
    this.player$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.player.set(value));
    this.gameSession$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSession.set(value));
    this.gameSessionPhase$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.gameSessionPhase.set(value));
  }

  private listenToWebsocketEvents(): void {
    this.websocketService.listen(WebsocketEvent.GAME_SESSION_PHASE_UPDATED, (data) => {
      console.log(data);
    });
    this.websocketService.listen(WebsocketEvent.PLAYER_UPDATED, (data) => {
      console.log(data);
    });
  }
}
