import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GameSessionsService } from '@Services/game-sessions.service';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import {
  loadGameSessions,
  loadGameSessionsFailure,
  loadGameSessionsSuccess,
  nextGameSessionPhase,
  nextGameSessionPhaseFailure,
  nextGameSessionPhaseSuccess,
  previousGameSessionPhase,
  previousGameSessionPhaseFailure,
  previousGameSessionPhaseSuccess,
  removeGameSession,
  removeGameSessionFailure,
  removeGameSessionSuccess,
  resetGameSessionPhase,
  resetGameSessionPhaseFailure,
  resetGameSessionPhaseSuccess,
} from '@States/game-sessions/game-session.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { GAME_SESSION_STATE_CONFIG } from '@States/game-sessions/game-session.config';
import { HttpErrorResponse } from '@angular/common/http';
import { GameSession } from '@Models/game-session.model';

@Injectable()
export class GameSessionEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly gameSessionService = inject(GameSessionsService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  removeCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeGameSession),
      switchMap(({ token }) =>
        this.gameSessionService.removeGameSession(token).pipe(
          map(() => {
            this.toastService.success(
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.removeGameSessionSuccess,
            );
            return removeGameSessionSuccess({ token });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(removeGameSessionFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadGameSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGameSessions),
      switchMap(() =>
        this.gameSessionService.getAllGameSessions().pipe(
          map((response) =>
            loadGameSessionsSuccess({
              gameSessions: response.data.map((gameSession) => GameSession.fromDto(gameSession)),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(loadGameSessionsFailure({ error }));
          }),
        ),
      ),
    ),
  );

  resetGameSessionPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetGameSessionPhase),
      switchMap(({ token }) =>
        this.gameSessionService.resetGameSessionPhase(token).pipe(
          map((response) => {
            this.toastService.success(
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.resetGameSessionPhaseSuccess,
            );
            return resetGameSessionPhaseSuccess({ gameSession: GameSession.fromDto(response.data) });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(resetGameSessionPhaseFailure({ error }));
          }),
        ),
      ),
    ),
  );

  nextGameSessionPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextGameSessionPhase),
      switchMap(({ token }) =>
        this.gameSessionService.nextGameSessionPhase(token).pipe(
          map((response) => {
            this.toastService.success(
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.nextGameSessionPhaseSuccess,
            );
            return nextGameSessionPhaseSuccess({ gameSession: GameSession.fromDto(response.data) });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(nextGameSessionPhaseFailure({ error }));
          }),
        ),
      ),
    ),
  );

  previousGameSessionPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(previousGameSessionPhase),
      switchMap(({ token }) =>
        this.gameSessionService.previousGameSessionPhase(token).pipe(
          map((response) => {
            this.toastService.success(
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.previousGameSessionPhaseSuccess,
            );
            return previousGameSessionPhaseSuccess({ gameSession: GameSession.fromDto(response.data) });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(previousGameSessionPhaseFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
