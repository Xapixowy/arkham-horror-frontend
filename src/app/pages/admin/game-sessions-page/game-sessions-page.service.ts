import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {ConfirmationService, SortEvent} from 'primeng/api';
import {selectGameSessions, selectGameSessionStatus} from '@States/game-sessions/game-session.selectors';
import {GameSession} from '@Models/game-session.model';
import {StateStatus} from '@Enums/state-status.enum';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  loadGameSessions,
  nextGameSessionPhase,
  previousGameSessionPhase,
  removeGameSession,
  resetGameSessionPhase
} from '@States/game-sessions/game-session.actions';
import {TableHelper} from '@Helpers/table.helper';

@Injectable({
  providedIn: 'root'
})
export class GameSessionsPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly gameSessions$ = this.store.select(selectGameSessions);
  private readonly gameSessionsStatus$ = this.store.select(selectGameSessionStatus);

  readonly gameSessions = signal<GameSession[]>([]);
  readonly gameSessionsStatus = signal<StateStatus>(StateStatus.LOADING);

  readonly isGameSessionsTableSorting = signal(false);
  readonly isPlayersModalShown = signal(false);

  constructor() {
    this.subscribeForGameSessionsChanges();
    this.subscribeForGameSessionsStatusChanges();
    this.store.dispatch(loadGameSessions());
  }

  removeGameSession(gameSession: GameSession): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_GameSessionsPage.Delete game session',
      message: '_GameSessionsPage.Are you sure you want to delete this game session?',
      accept: () => this.store.dispatch(removeGameSession({token: gameSession.token})),
    });
  }

  showPlayersModal(gameSession: GameSession): void {
    this.isPlayersModalShown.set(true);
  }

  hidePlayersModal(): void {
    this.isPlayersModalShown.set(false);
  }

  sortGameSessions(event: SortEvent): void {
    if (this.isGameSessionsTableSorting()) {
      return;
    }
    this.isGameSessionsTableSorting.set(true);
    this.gameSessions.set(TableHelper.sort<GameSession>(event, this.gameSessions()));
    setTimeout(() => this.isGameSessionsTableSorting.set(false), 0);
  }

  nextGameSessionPhase(gameSession: GameSession): void {
    this.store.dispatch(nextGameSessionPhase({token: gameSession.token}));
  }

  resetGameSessionPhase(gameSession: GameSession): void {
    this.store.dispatch(resetGameSessionPhase({token: gameSession.token}));
  }

  previousGameSessionPhase(gameSession: GameSession): void {
    this.store.dispatch(previousGameSessionPhase({token: gameSession.token}));
  }

  private subscribeForGameSessionsChanges(): void {
    this.gameSessions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSessions.set(value));
  }

  private subscribeForGameSessionsStatusChanges(): void {
    this.gameSessionsStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSessionsStatus.set(value));
  }
}
