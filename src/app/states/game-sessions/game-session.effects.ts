import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameSessionsService } from '@Services/http/game-sessions.service';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import {
  loadGameSessions,
  loadGameSessionsFailure,
  loadGameSessionsSuccess,
  loadPlayers,
  loadPlayersFailure,
  loadPlayersSuccess,
  nextGameSessionPhase,
  nextGameSessionPhaseFailure,
  nextGameSessionPhaseSuccess,
  previousGameSessionPhase,
  previousGameSessionPhaseFailure,
  previousGameSessionPhaseSuccess,
  removeGameSession,
  removeGameSessionFailure,
  removeGameSessionSuccess,
  removePlayer,
  removePlayerFailure,
  removePlayerSuccess,
  renewPlayerCharacter,
  renewPlayerCharacterFailure,
  renewPlayerCharacterSuccess,
  resetGameSessionPhase,
  resetGameSessionPhaseFailure,
  resetGameSessionPhaseSuccess,
  updatePlayer,
  updatePlayerFailure,
  updatePlayerSuccess,
} from '@States/game-sessions/game-session.actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { GAME_SESSION_STATE_CONFIG } from '@States/game-sessions/game-session.config';
import { HttpErrorResponse } from '@angular/common/http';
import { GameSession } from '@Models/game-session.model';
import { PlayersService } from '@Services/http/players.service';
import { Player } from '@Models/player.model';
import { PlayerCard } from '@Models/player-card.model';

@Injectable()
export class GameSessionEffects {
  private readonly actions$ = inject(Actions);
  private readonly gameSessionService = inject(GameSessionsService);
  private readonly playersService = inject(PlayersService);
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

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlayer),
      concatMap(
        ({ gameSessionToken, playerToken, updatePlayerPayload, assignPlayerCardsPayload, removePlayerCardsPayload }) =>
          this.playersService.updatePlayer(gameSessionToken, playerToken, updatePlayerPayload).pipe(
            concatMap((updatePlayerResponse) =>
              this.playersService.assignPlayerCards(gameSessionToken, playerToken, assignPlayerCardsPayload).pipe(
                concatMap(() =>
                  this.playersService.removePlayerCards(gameSessionToken, playerToken, removePlayerCardsPayload).pipe(
                    map((removePlayerCardsResponse) => {
                      this.toastService.success(
                        GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players,
                        GAME_SESSION_STATE_CONFIG.toastTranslationKeys.updatePlayerSuccess,
                      );
                      return updatePlayerSuccess({
                        gameSessionToken,
                        player: {
                          ...Player.fromDto(updatePlayerResponse.data),
                          playerCards: removePlayerCardsResponse.data.map((playerCard) =>
                            PlayerCard.fromDto(playerCard),
                          ),
                        },
                      });
                    }),
                    catchError((response: HttpErrorResponse) => {
                      const { error } = response.error;
                      this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players, response);
                      return of(updatePlayerFailure({ error }));
                    }),
                  ),
                ),
              ),
            ),
          ),
      ),
    ),
  );

  removePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removePlayer),
      switchMap(({ gameSessionToken, playerToken }) =>
        this.playersService.removePlayer(gameSessionToken, playerToken).pipe(
          map(() => {
            this.toastService.success(
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players,
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.removePlayerSuccess,
            );
            return removePlayerSuccess({ gameSessionToken, playerToken });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players, response);
            return of(removePlayerFailure({ error }));
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
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players,
              GAME_SESSION_STATE_CONFIG.toastTranslationKeys.renewPlayerCharacterSuccess,
            );
            return renewPlayerCharacterSuccess({ gameSessionToken, player: Player.fromDto(response.data) });
          }),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players, response);
            return of(renewPlayerCharacterFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlayers),
      switchMap(({ token }) =>
        this.playersService.loadPlayers(token).pipe(
          map((response) =>
            loadPlayersSuccess({
              gameSessionToken: token,
              players: response.data.map((player) => Player.fromDto(player)),
            }),
          ),
          catchError((response: HttpErrorResponse) => {
            const { error } = response.error;
            this.errorService.throwError(GAME_SESSION_STATE_CONFIG.toastTranslationKeys.players, response);
            return of(loadPlayersFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
