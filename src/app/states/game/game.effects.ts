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
  nextGameSessionPhase,
  nextGameSessionPhaseFailure,
  nextGameSessionPhaseSuccess,
  previousGameSessionPhase,
  previousGameSessionPhaseFailure,
  previousGameSessionPhaseSuccess,
  renewPlayerCharacter,
  renewPlayerCharacterFailure,
  renewPlayerCharacterSuccess,
  resetGameSessionPhase,
  resetGameSessionPhaseFailure,
  resetGameSessionPhaseSuccess,
  updatePlayer,
  updatePlayerCards,
  updatePlayerCardsFailure,
  updatePlayerCardsSuccess,
  updatePlayerFailure,
  updatePlayerSuccess,
} from '@States/game/game.actions';
import { GAME_STATE_CONFIG } from '@States/game/game.config';
import { PlayerDto } from '@Types/dtos/player-dto.type';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';
import { PlayerCard } from '@Models/player-card.model';

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

            console.log(response.data, this.getNewestPlayerFromGameSession(response.data));

            return createGameSessionSuccess({
              gameSession: GameSession.fromDto(response.data),
              player: Player.fromDto(this.getNewestPlayerFromGameSession(response.data)),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            console.log(response);
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
              gameSession: GameSession.fromDto(response.data.game_session),
              player: Player.fromDto(response.data.player),
            });
          }),
          catchError((response: HttpErrorResponse) => {
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
      switchMap(({ gameSessionToken, playerToken, payload }) =>
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

  nextGameSessionPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextGameSessionPhase),
      switchMap(({ gameSessionToken }) =>
        this.gameSessionService.nextGameSessionPhase(gameSessionToken).pipe(
          map((response) => {
            this.toastService.success(
              GAME_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_STATE_CONFIG.toastTranslationKeys.nextGameSessionPhaseSuccess,
            );
            return nextGameSessionPhaseSuccess({
              gameSession: GameSession.fromDto(response.data),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(nextGameSessionPhaseFailure({ error }));
          }),
        ),
      ),
    ),
  );

  previousGameSessionPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(previousGameSessionPhase),
      switchMap(({ gameSessionToken }) =>
        this.gameSessionService.previousGameSessionPhase(gameSessionToken).pipe(
          map((response) => {
            this.toastService.success(
              GAME_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_STATE_CONFIG.toastTranslationKeys.previousGameSessionPhaseSuccess,
            );
            return previousGameSessionPhaseSuccess({
              gameSession: GameSession.fromDto(response.data),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(previousGameSessionPhaseFailure({ error }));
          }),
        ),
      ),
    ),
  );

  resetGameSessionPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetGameSessionPhase),
      switchMap(({ gameSessionToken }) =>
        this.gameSessionService.resetGameSessionPhase(gameSessionToken).pipe(
          map((response) => {
            this.toastService.success(
              GAME_STATE_CONFIG.toastTranslationKeys.gameSessions,
              GAME_STATE_CONFIG.toastTranslationKeys.resetGameSessionPhaseSuccess,
            );
            return resetGameSessionPhaseSuccess({
              gameSession: GameSession.fromDto(response.data),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.gameSessions, response);
            return of(resetGameSessionPhaseFailure({ error }));
          }),
        ),
      ),
    ),
  );

  renewPlayerCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(renewPlayerCharacter),
      switchMap(({ gameSessionToken, playerToken }) =>
        this.playersService.renewPlayerCharacter(gameSessionToken, playerToken).pipe(
          map((response) => {
            this.toastService.success(
              GAME_STATE_CONFIG.toastTranslationKeys.players,
              GAME_STATE_CONFIG.toastTranslationKeys.renewPlayerCharacterSuccess,
            );

            return renewPlayerCharacterSuccess({
              player: Player.fromDto(response.data),
            });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.players, response);
            return of(renewPlayerCharacterFailure({ error }));
          }),
        ),
      ),
    ),
  );

  updatePlayerCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlayerCards),
      concatMap(({ gameSessionToken, playerToken, assignPlayerCardsPayload, removePlayerCardsPayload }) =>
        this.playersService.assignPlayerCards(gameSessionToken, playerToken, assignPlayerCardsPayload).pipe(
          concatMap(() =>
            this.playersService.removePlayerCards(gameSessionToken, playerToken, removePlayerCardsPayload).pipe(
              map((response) =>
                updatePlayerCardsSuccess({
                  cards: response.data.map((playerCard) => PlayerCard.fromDto(playerCard)),
                }),
              ),
            ),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_STATE_CONFIG.toastTranslationKeys.players, response);
            return of(updatePlayerCardsFailure({ error }));
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
