import { computed, inject, Injectable, signal } from '@angular/core';
import { GameLayoutService } from '@Layouts/game-layout/_services/game-layout.service';
import { Player } from '@Models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerPageService {
  private readonly gameLayoutService = inject(GameLayoutService);

  readonly isFirstLoading = this.gameLayoutService.isFirstLoading;

  readonly isPlayerStatisticsModalShown = signal<boolean>(false);
  readonly isPlayerCharacterDetailsModalShown = signal<boolean>(false);
  readonly modalPlayer = signal<Player | null>(null);

  readonly players = computed<Player[]>(() =>
    [...(this.gameLayoutService.gameSession()?.players ?? [])].sort(
      (a, b) => b.updated_at.getTime() - a.updated_at.getTime(),
    ),
  );
  readonly gameSessionToken = computed<string | null>(() => this.gameLayoutService.gameSession()?.token ?? null);

  showPlayerCharacterDetailsModal(player: Player): void {
    this.modalPlayer.set(player);
    this.isPlayerCharacterDetailsModalShown.set(true);
  }

  hidePlayerCharacterDetailsModal(): void {
    this.isPlayerCharacterDetailsModalShown.set(false);
    this.modalPlayer.set(null);
  }

  showPlayerStatisticsModal(player: Player): void {
    this.modalPlayer.set(player);
    this.isPlayerStatisticsModalShown.set(true);
  }

  hidePlayerStatisticsModal(): void {
    this.isPlayerStatisticsModalShown.set(false);
    this.modalPlayer.set(null);
  }
}
