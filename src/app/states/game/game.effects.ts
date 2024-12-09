import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameSessionsService } from '@Services/http/game-sessions.service';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GameSession } from '@Models/game-session.model';
import { PlayersService } from '@Services/http/players.service';
import { Player } from '@Models/player.model';
import { createGameSession, createGameSessionFailure, createGameSessionSuccess } from '@States/game/game.actions';
import { GAME_STATE_CONFIG } from '@States/game/game.config';

@Injectable()
export class GameEffects {
  private readonly actions$ = inject(Actions);
  private readonly gameSessionService = inject(GameSessionsService);
  private readonly playersService = inject(PlayersService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  createGameSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGameSession),
      switchMap(() =>
        this.gameSessionService.createGameSession().pipe(
          map((response) => {
            this.toastService.success(
              GAME_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_STATE_CONFIG.toastTranslationKeys.createGameSessionSuccess,
            );
            const newestPlayer = response.data.players!.sort((a, b) => {
              const aCreatedAt = a.created_at ?? new Date();
              const bCreatedAt = b.created_at ?? new Date();

              return bCreatedAt.getTime() - aCreatedAt.getTime();
            })[0];

            return createGameSessionSuccess({
              gameSession: GameSession.fromDto(response.data),
              player: Player.fromDto(newestPlayer),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(createGameSessionFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
