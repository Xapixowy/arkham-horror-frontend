import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { SpeedDialComponent } from '@Components/speed-dial/speed-dial.component';
import { GAME_LAYOUT_CONFIG } from '@Layouts/game-layout/_configs/game-layout.config';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@Services/local-storage.service';
import { joinGameSession } from '@States/game/game.actions';
import { GameLayoutService } from '@Layouts/game-layout/_services/game-layout.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { WindowEvent } from '@Enums/window-event.enum';
import { CardModule } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { WebsocketService } from '@Services/websocket.service';
import { PlayerStatisticsDialogComponent } from '@Layouts/game-layout/_components/player-statistics-dialog/player-statistics-dialog.component';
import { SkeletonModule } from 'primeng/skeleton';
import { GameSessionPhaseComponent } from '@Layouts/game-layout/_components/game-session-phase/game-session-phase.component';

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Button,
    SpeedDialComponent,
    NgIcon,
    TranslocoPipe,
    CardModule,
    PrimeTemplate,
    NoContentComponent,
    PlayerStatisticsDialogComponent,
    SkeletonModule,
    GameSessionPhaseComponent,
  ],
  providers: [GameLayoutService, WebsocketService, provideIcons(GAME_LAYOUT_CONFIG.icons)],
  templateUrl: './game-layout.component.html',
  styleUrl: './game-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GameLayoutComponent {
  private readonly gameLayoutService = inject(GameLayoutService);
  private readonly store = inject(Store);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly speedDialItems = this.gameLayoutService.speedDialItems;
  protected readonly player = this.gameLayoutService.player;
  protected readonly gameSession = this.gameLayoutService.gameSession;
  protected readonly gameSessionPhase = this.gameLayoutService.gameSessionPhase;
  protected readonly isLoading = this.gameLayoutService.isFirstLoading;

  protected readonly isPlayerStatisticsShown = signal<boolean>(false);

  constructor() {
    this.updateGameSession();
    this.listenToWindowEvents();
  }

  onPlayerStatisticsClose(): void {
    this.isPlayerStatisticsShown.set(false);
  }

  private updateGameSession(): void {
    const gameSessionToken = this.localStorageService.gameSessionToken;

    if (!gameSessionToken) {
      return;
    }

    this.store.dispatch(joinGameSession({ gameSessionToken }));
  }

  private listenToWindowEvents(): void {
    window.addEventListener(WindowEvent.GAME_PLAYER_STATISTICS_SHOW, () => {
      this.isPlayerStatisticsShown.set(true);
    });
  }
}
