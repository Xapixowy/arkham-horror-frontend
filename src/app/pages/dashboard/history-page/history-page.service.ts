import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDashboardStatus, selectGameSessions } from '@States/dashboard/dashboard.selectors';
import { GameSession } from '@Models/game-session.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadGameSessions } from '@States/dashboard/dashboard.actions';
import { LocalStorageService } from '@Services/local-storage.service';
import { StateStatus } from '@Enums/state-status.enum';

@Injectable({
  providedIn: 'root',
})
export class HistoryPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly gameSessions$ = this.store.select(selectGameSessions);
  private readonly dashboardStatus$ = this.store.select(selectDashboardStatus);

  readonly gameSessions = signal<GameSession[]>([]);
  readonly dashboardStatus = signal<StateStatus>(StateStatus.PENDING);
  readonly user = this.localStorageService.user!;

  constructor() {
    this.store.dispatch(
      loadGameSessions({
        userId: this.user.id,
      }),
    );
    this.listenToGameSessionsChanges();
    this.listenToDashboardStatusChanges();
  }

  private listenToGameSessionsChanges(): void {
    this.gameSessions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSessions.set(value));
  }

  private listenToDashboardStatusChanges(): void {
    this.dashboardStatus$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.dashboardStatus.set(value));
  }
}
