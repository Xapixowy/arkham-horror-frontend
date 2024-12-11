import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HistoryPageService } from '@Pages/dashboard/history-page/history-page.service';
import { GameSessionComponent } from '@Pages/dashboard/history-page/_components/game-session/game-session.component';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [GameSessionComponent],
  providers: [HistoryPageService],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPageComponent {
  private readonly historyPageService = inject(HistoryPageService);

  protected readonly gameSessions = this.historyPageService.gameSessions;
}
