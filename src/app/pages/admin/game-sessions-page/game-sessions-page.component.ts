import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ButtonIconOnlyComponent} from '@Components/button-icon-only/button-icon-only.component';
import {DateHumanReadableComponent} from '@Components/date-human-readable/date-human-readable.component';
import {ImgPlaceholderComponent} from '@Components/img-placeholder/img-placeholder.component';
import {NoContentComponent} from '@Components/no-content/no-content.component';
import {PrimeTemplate, SortEvent} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TranslocoPipe} from '@jsverse/transloco';
import {GameSessionsPageService} from '@Pages/admin/game-sessions-page/game-sessions-page.service';
import {StateStatus} from '@Enums/state-status.enum';
import {provideIcons} from '@ng-icons/core';
import {tablerArrowLeft, tablerArrowRight, tablerRefresh, tablerTrash, tablerUsers} from '@ng-icons/tabler-icons';
import {GameSession} from '@Models/game-session.model';
import {TooltipModule} from 'primeng/tooltip';
import {PlayersModalComponent} from '@Pages/admin/game-sessions-page/_components/players-modal/players-modal.component';
import {
  PlayerStatisticsModalComponent
} from '@Pages/admin/game-sessions-page/_components/player-statistics-modal/player-statistics-modal.component';
import {PlayerModalComponent} from '@Pages/admin/game-sessions-page/_components/player-modal/player-modal.component';

@Component({
  selector: 'app-game-sessions-page',
  standalone: true,
  imports: [
    ButtonIconOnlyComponent,
    DateHumanReadableComponent,
    ImgPlaceholderComponent,
    NoContentComponent,
    PrimeTemplate,
    TableModule,
    TranslocoPipe,
    TooltipModule,
    PlayersModalComponent,
    PlayerStatisticsModalComponent,
    PlayerModalComponent,
  ],
  providers: [provideIcons({
    tablerArrowLeft,
    tablerArrowRight,
    tablerRefresh,
    tablerUsers,
    tablerTrash,
  })],
  templateUrl: './game-sessions-page.component.html',
  styleUrl: './game-sessions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionsPageComponent {
  private readonly gameSessionsPageService = inject(GameSessionsPageService);

  protected readonly gameSessions = this.gameSessionsPageService.gameSessions;

  protected readonly isLoading = computed<boolean>(
    () =>
      this.gameSessionsPageService.gameSessionsStatus() === StateStatus.LOADING,
  );

  onSort(event: SortEvent): void {
    this.gameSessionsPageService.sortGameSessions(event);
  }

  onDelete(gameSession: GameSession): void {
    this.gameSessionsPageService.removeGameSession(gameSession);
  }

  onNextPhase(gameSession: GameSession): void {
    this.gameSessionsPageService.nextGameSessionPhase(gameSession);
  }

  onPreviousPhase(gameSession: GameSession): void {
    this.gameSessionsPageService.previousGameSessionPhase(gameSession);
  }

  onResetPhase(gameSession: GameSession): void {
    this.gameSessionsPageService.resetGameSessionPhase(gameSession);
  }

  onPlayersShow(gameSession: GameSession): void {
    this.gameSessionsPageService.showPlayersModal(gameSession);
  }
}
