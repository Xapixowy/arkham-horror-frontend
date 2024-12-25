import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { SpeedDialItem } from '@Components/speed-dial/_types/speed-dial-item.type';
import { GAME_LAYOUT_CONFIG } from '@Layouts/game-layout/_configs/game-layout.config';
import { NavigationEnd, Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { GameSpeedDialId } from '@Layouts/game-layout/_enums/game-speed-dial-id.enum';
import { WindowEvent } from '@Enums/window-event.enum';
import { Store } from '@ngrx/store';
import { selectGameSession, selectGameSessionPhase, selectGameStatus, selectPlayer } from '@States/game/game.selectors';
import { Player } from '@Models/player.model';
import { GameSession } from '@Models/game-session.model';
import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  createGameSessionPlayer,
  nextGameSessionPhase,
  previousGameSessionPhase,
  renewPlayerCharacter,
  resetGameSessionPhase,
  updateGameSessionPhase,
  updateGameSessionPlayers,
} from '@States/game/game.actions';
import { WebsocketService } from '@Services/websocket.service';
import { WebsocketGateway } from '@Enums/websockets/websocket-gateway.enum';
import { WebsocketEvent } from '@Enums/websockets/websocket-event.enum';
import { UserRole } from '@Enums/users/user-role.enum';
import { PlayerRole } from '@Enums/players/player-role.enum';
import { LocalStorageService } from '@Services/local-storage.service';
import { DataResponse } from '@Types/data-response.type';
import { GameSessionPhaseUpdatedResponse } from '@Types/responses/websockets/game-sessions/game-session-phase-updated-response.type';
import { ConfirmationService } from 'primeng/api';
import { PlayerJoinedResponse } from '@Types/responses/websockets/game-sessions/player-joined-response.type';
import { StateStatus } from '@Enums/state-status.enum';

@Injectable({
  providedIn: 'root',
})
export class GameLayoutService {
  private readonly websocketService = inject(WebsocketService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly confirmationService = inject(ConfirmationService);

  readonly speedDialItems = signal<SpeedDialItem[]>(GAME_LAYOUT_CONFIG.speedDialItems);
  readonly player = signal<Player | null>(null);
  readonly gameSession = signal<GameSession | null>(null);
  readonly gameSessionPhase = signal<GameSessionPhase | null>(null);
  readonly gameStatus = signal<StateStatus>(StateStatus.PENDING);

  readonly isFirstLoading = computed<boolean>(
    () => this.gameStatus() === StateStatus.LOADING && this.player() === null && this.gameSession() === null,
  );

  readonly player$ = this.store.select(selectPlayer);
  private readonly gameSession$ = this.store.select(selectGameSession);
  private readonly gameSessionPhase$ = this.store.select(selectGameSessionPhase);
  private readonly gameStatus$ = this.store.select(selectGameStatus);

  readonly user = this.localStorageService.user;

  constructor() {
    this.listenToUrlChanges();
    this.listenToStoreChanges();
    this.setSpeedDialItems(this.router.url);
    this.websocketService.connect(WebsocketGateway.GAME_SESSIONS, this.localStorageService.gameSessionToken!);
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

      if (item.id === GameSpeedDialId.RENEW_CHARACTER) {
        return {
          ...item,
          action: () =>
            this.confirmationService.confirm({
              key: 'warning',
              header: '_GameLayout.Character renewal',
              message: '_GameLayout.Are you sure you want to renew your character?',
              accept: () => {
                this.store.dispatch(
                  renewPlayerCharacter({
                    gameSessionToken: this.localStorageService.gameSessionToken!,
                    playerToken: this.localStorageService.playerToken!,
                  }),
                );
              },
            }),
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
      const isRenewPlayerCharacter = item.id === GameSpeedDialId.RENEW_CHARACTER;

      if (!isCharacterPage && (isCharacterDetails || isRenewPlayerCharacter)) {
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
    this.player$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value?.character && this.player()?.character && value.character.id !== this.player()?.character?.id) {
        window.dispatchEvent(new CustomEvent(WindowEvent.GAME_PLAYER_RENEW_CHARACTER));
      }
      this.player.set(value);
    });
    this.gameSession$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSession.set(value));
    this.gameSessionPhase$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.gameSessionPhase.set(value));
    this.gameStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameStatus.set(value));
  }

  private listenToWebsocketEvents(): void {
    this.websocketService.listen(
      WebsocketEvent.GAME_SESSION_PHASE_UPDATED,
      (response: DataResponse<GameSessionPhaseUpdatedResponse>) => {
        this.store.dispatch(
          updateGameSessionPhase({
            gameSessionToken: response.data.game_session_token,
            phase: response.data.phase,
          }),
        );
      },
    );
    this.websocketService.listen(WebsocketEvent.PLAYER_UPDATED, (response: DataResponse<PlayerJoinedResponse>) => {
      this.store.dispatch(
        updateGameSessionPlayers({
          gameSessionToken: response.data.game_session_token,
          player: response.data.player,
        }),
      );
    });
    this.websocketService.listen(
      WebsocketEvent.GAME_SESSION_PLAYER_JOINED,
      (response: DataResponse<PlayerJoinedResponse>) => {
        this.store.dispatch(
          createGameSessionPlayer({
            gameSessionToken: response.data.game_session_token,
            player: response.data.player,
          }),
        );
      },
    );
  }
}
