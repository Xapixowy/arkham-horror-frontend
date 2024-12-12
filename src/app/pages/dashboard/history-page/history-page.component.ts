import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HistoryPageService } from '@Pages/dashboard/history-page/history-page.service';
import { GameSessionComponent } from '@Pages/dashboard/history-page/_components/game-session/game-session.component';
import { LocalStorageService } from '@Services/local-storage.service';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { StateStatus } from '@Enums/state-status.enum';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [GameSessionComponent, NoContentComponent, SkeletonModule],
  providers: [HistoryPageService],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPageComponent {
  private readonly historyPageService = inject(HistoryPageService);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly gameSessions = this.historyPageService.gameSessions;
  protected readonly dashboardStatus = this.historyPageService.dashboardStatus;
  protected readonly user = this.localStorageService.user!;
  protected readonly StateStatus = StateStatus;
}
