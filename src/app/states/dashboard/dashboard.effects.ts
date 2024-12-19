import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ErrorService } from '@Services/error.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GameSession } from '@Models/game-session.model';
import { UserService } from '@Services/http/user.service';
import {
  loadGameSessions,
  loadGameSessionsFailure,
  loadGameSessionsSuccess,
  loadUserStatistics,
  loadUserStatisticsFailure,
  loadUserStatisticsSuccess,
} from '@States/dashboard/dashboard.actions';
import { DASHBOARD_STATE_CONFIG } from '@States/dashboard/dashboard.config';

@Injectable()
export class DashboardEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly errorService = inject(ErrorService);

  loadGameSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGameSessions),
      switchMap(({ userId }) =>
        this.userService.getUserGameSessions(userId).pipe(
          map((response) =>
            loadGameSessionsSuccess({
              gameSessions: response.data
                .map((gameSession) => GameSession.fromDto(gameSession))
                .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(DASHBOARD_STATE_CONFIG.toastTranslationKeys.user, response);
            return of(loadGameSessionsFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadUserStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserStatistics),
      switchMap(({ userId }) =>
        this.userService.getUserStatistics(userId).pipe(
          map((response) =>
            loadUserStatisticsSuccess({
              userStatistics: response.data,
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(DASHBOARD_STATE_CONFIG.toastTranslationKeys.user, response);
            return of(loadUserStatisticsFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
