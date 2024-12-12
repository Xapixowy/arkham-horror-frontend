import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@Services/local-storage.service';
import { selectDashboardStatus, selectUserStatistics } from '@States/dashboard/dashboard.selectors';
import { StateStatus } from '@Enums/state-status.enum';
import { loadUserStatistics } from '@States/dashboard/dashboard.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStatistics } from '@Types/user/user-statistics.type';

@Injectable({
  providedIn: 'root',
})
export class StatisticsPageService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  private readonly userStatistics$ = this.store.select(selectUserStatistics);
  private readonly dashboardStatus$ = this.store.select(selectDashboardStatus);

  readonly userStatistics = signal<UserStatistics | null>(null);
  readonly dashboardStatus = signal<StateStatus>(StateStatus.PENDING);

  constructor() {
    this.store.dispatch(
      loadUserStatistics({
        userId: this.localStorageService.user!.id,
      }),
    );
    this.listenToUserStatisticsChanges();
    this.listenToDashboardStatusChanges();
  }

  private listenToUserStatisticsChanges(): void {
    this.userStatistics$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.userStatistics.set(value));
  }

  private listenToDashboardStatusChanges(): void {
    this.dashboardStatus$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.dashboardStatus.set(value));
  }
}
