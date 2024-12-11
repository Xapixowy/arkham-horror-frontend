import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGameSessions } from '@States/dashboard/dashboard.selectors';
import { GameSession } from '@Models/game-session.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadGameSessions } from '@States/dashboard/dashboard.actions';
import { LocalStorageService } from '@Services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly gameSessions$ = this.store.select(selectGameSessions);

  readonly gameSessions = signal<GameSession[]>([]);

  constructor() {
    this.store.dispatch(
      loadGameSessions({
        userId: this.localStorageService.user!.id,
      }),
    );
    this.listenToGameSessionsChanges();
  }

  private listenToGameSessionsChanges(): void {
    this.gameSessions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSessions.set(value));
  }
}
