import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PlayerComponent } from '@Pages/game/players-page/_components/player/player.component';
import { PlayerPageService } from '@Pages/game/players-page/_services/player-page.service';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { Player } from '@Models/player.model';
import { Character } from '@Models/character.model';
import { PlayerStatisticsDialogComponent } from '@Layouts/game-layout/_components/player-statistics-dialog/player-statistics-dialog.component';
import { PlayerCharacterDetailsModalComponent } from '@Layouts/game-layout/_components/player-character-details-modal/player-character-details-modal.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [
    PlayerComponent,
    NoContentComponent,
    TranslocoPipe,
    PlayerStatisticsDialogComponent,
    PlayerCharacterDetailsModalComponent,
    SkeletonModule,
  ],
  providers: [PlayerPageService],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPageComponent {
  private readonly playerPageService = inject(PlayerPageService);

  protected readonly players = this.playerPageService.players;
  protected readonly gameSessionToken = this.playerPageService.gameSessionToken;
  protected readonly isPlayerCharacterDetailsModalShown = this.playerPageService.isPlayerCharacterDetailsModalShown;
  protected readonly isPlayerStatisticsModalShown = this.playerPageService.isPlayerStatisticsModalShown;
  protected readonly modalPlayer = this.playerPageService.modalPlayer;
  protected readonly isLoading = this.playerPageService.isFirstLoading;

  protected readonly character = computed<Character | null>(
    () => this.playerPageService.modalPlayer()?.character ?? null,
  );

  onShowPlayerCharacterDetailsModal(player: Player): void {
    this.playerPageService.showPlayerCharacterDetailsModal(player);
  }

  onHidePlayerCharacterDetailsModal(): void {
    this.playerPageService.hidePlayerCharacterDetailsModal();
  }

  onShowPlayerStatistics(player: Player): void {
    this.playerPageService.showPlayerStatisticsModal(player);
  }

  onHidePlayerStatistics(): void {
    this.playerPageService.hidePlayerStatisticsModal();
  }
}
