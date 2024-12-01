import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {ButtonIconOnlyComponent} from '@Components/button-icon-only/button-icon-only.component';
import {DateHumanReadableComponent} from '@Components/date-human-readable/date-human-readable.component';
import {DialogModule} from 'primeng/dialog';
import {NoContentComponent} from '@Components/no-content/no-content.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TranslocoPipe} from '@jsverse/transloco';
import {TruncatePipe} from '@Pipes/truncate.pipe';
import {TooltipModule} from 'primeng/tooltip';
import {User} from '@Models/user.model';
import {GameSessionsPageService} from '@Pages/admin/game-sessions-page/game-sessions-page.service';
import {StateStatus} from '@Enums/state-status.enum';
import {Player} from '@Models/player.model';
import {provideIcons} from '@ng-icons/core';
import {tablerChartBar, tablerEdit, tablerTrash, tablerUserQuestion} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-players-modal',
  standalone: true,
  imports: [
    Button,
    ButtonIconOnlyComponent,
    DateHumanReadableComponent,
    DialogModule,
    NoContentComponent,
    OverlayPanelModule,
    PrimeTemplate,
    TableModule,
    TranslocoPipe,
    TruncatePipe,
    TooltipModule
  ],
  providers: [provideIcons({
    tablerChartBar,
    tablerUserQuestion,
    tablerEdit,
    tablerTrash
  })],
  templateUrl: './players-modal.component.html',
  styleUrl: './players-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersModalComponent {
  private readonly gameSessionsPageService = inject(GameSessionsPageService);

  protected readonly isPlayersModalShown = this.gameSessionsPageService.isPlayersModalShown;
  protected readonly players = this.gameSessionsPageService.players;

  protected readonly isLoading = computed<boolean>(() => this.gameSessionsPageService.gameSessionsStatus() === StateStatus.LOADING && this.players().length === 0);

  protected getUserEmailWithName(user?: User): string | undefined {
    return user ? `${user.email} (${user.name})` : undefined;
  }

  protected onHide(): void {
    this.gameSessionsPageService.hidePlayersModal();
  }

  protected onShowStatistics(player: Player): void {
    this.gameSessionsPageService.showPlayerStatisticsModal(player);
  }

  protected onRenewCharacter(player: Player): void {
    this.gameSessionsPageService.renewPlayerCharacter(player);
  }

  protected onEditInit(player: Player): void {
    this.gameSessionsPageService.showPlayerModal(player);
  }

  protected onDelete(player: Player): void {
    this.gameSessionsPageService.deletePlayer(player);
  }
}
