import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameSessionsService } from '@Services/http/game-sessions.service';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GameSession } from '@Models/game-session.model';
import { PlayersService } from '@Services/http/players.service';
import { Player } from '@Models/player.model';
import {
  createGameSession,
  createGameSessionFailure,
  createGameSessionSuccess,
  joinGameSession,
  joinGameSessionFailure,
  joinGameSessionSuccess,
  updatePlayer,
  updatePlayerFailure,
  updatePlayerSuccess,
} from '@States/game/game.actions';
import { GAME_STATE_CONFIG } from '@States/game/game.config';
import { PlayerDto } from '@Types/dtos/player-dto.type';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

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

            return createGameSessionSuccess({
              gameSession: GameSession.fromDto(response.data),
              player: Player.fromDto(this.getNewestPlayerFromGameSession(response.data)),
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

  joinGameSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinGameSession),
      switchMap(({ gameSessionToken }) =>
        this.gameSessionService.joinGameSession(gameSessionToken).pipe(
          map((response) => {
            this.toastService.success(
              GAME_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_STATE_CONFIG.toastTranslationKeys.joinGameSessionSuccess,
            );

            return joinGameSessionSuccess({
              gameSession: GameSession.fromDto(response.data),
              player: Player.fromDto(this.getNewestPlayerFromGameSession(response.data)),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            console.log(response);
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(joinGameSessionFailure({ error }));
          }),
        ),
      ),
    ),
  );

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlayer),
      concatMap(({ gameSessionToken, playerToken, payload }) =>
        this.playersService.updatePlayer(gameSessionToken, playerToken, payload).pipe(
          map((response) =>
            updatePlayerSuccess({
              player: Player.fromDto(response.data),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.players, response);
            return of(updatePlayerFailure({ error }));
          }),
        ),
      ),
    ),
  );

  private getNewestPlayerFromGameSession(gameSession: GameSessionDto): PlayerDto {
    return gameSession.players!.sort((a, b) => {
      const aCreatedAt = a.created_at ? new Date(a.created_at) : new Date();
      const bCreatedAt = b.created_at ? new Date(b.created_at) : new Date();

      return bCreatedAt.getTime() - aCreatedAt.getTime();
    })[0];
  }
}
