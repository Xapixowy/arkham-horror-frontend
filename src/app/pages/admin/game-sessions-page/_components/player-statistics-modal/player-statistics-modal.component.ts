import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {GameSessionsPageService} from '@Pages/admin/game-sessions-page/game-sessions-page.service';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {NoContentComponent} from '@Components/no-content/no-content.component';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-player-statistics-modal',
  standalone: true,
  imports: [
    DialogModule,
    TableModule,
    NoContentComponent,
    TranslocoPipe
  ],
  templateUrl: './player-statistics-modal.component.html',
  styleUrl: './player-statistics-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerStatisticsModalComponent {
  private readonly gameSessionsPageService = inject(GameSessionsPageService);

  protected readonly isPlayerStatisticsModalShown = this.gameSessionsPageService.isPlayerStatisticsModalShown;
  protected readonly playerStatistics = this.gameSessionsPageService.playerStatistics;

  protected onHide(): void {
    this.gameSessionsPageService.hidePlayerStatisticsModal();
  }
}
