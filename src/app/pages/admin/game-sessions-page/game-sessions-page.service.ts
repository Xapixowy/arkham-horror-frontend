import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {ConfirmationService, SortEvent} from 'primeng/api';
import {selectGameSessions, selectGameSessionStatus, selectPlayers} from '@States/game-sessions/game-session.selectors';
import {GameSession} from '@Models/game-session.model';
import {StateStatus} from '@Enums/state-status.enum';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  loadGameSessions,
  loadPlayers,
  nextGameSessionPhase,
  previousGameSessionPhase,
  removeGameSession,
  removePlayer,
  renewPlayerCharacter,
  resetGameSessionPhase,
  updatePlayer,
} from '@States/game-sessions/game-session.actions';
import {TableHelper} from '@Helpers/table.helper';
import {Player} from '@Models/player.model';
import {Observable, Subscription} from 'rxjs';
import {
  PlayerStatisticsModalStatistics
} from '@Pages/admin/game-sessions-page/_components/player-statistics-modal/_types/player-statistics-modal-statistics.type';
import {FormControl, FormGroup} from '@angular/forms';
import {PlayerForm} from '@Types/forms/player-form.type';
import {PlayerFormControls} from '@Enums/form-controls/player-controls.enum';
import {PLAYER_FORM_VALIDATORS} from '@Configs/form-validators/player-form-validators.config';
import {PlayerCard} from '@Models/player-card.model';
import {FormValidationService} from '@Services/form-validation.service';
import {CardSelectorService} from '@Components/card-selector/card-selector.service';

@Injectable({
  providedIn: 'root',
})
export class GameSessionsPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly gameSessions$ = this.store.select(selectGameSessions);
  private readonly gameSessionsStatus$ = this.store.select(selectGameSessionStatus);

  readonly gameSessions = signal<GameSession[]>([]);
  readonly gameSessionsStatus = signal<StateStatus>(StateStatus.LOADING);
  readonly playersGameSession = signal<GameSession | null>(null);
  readonly players = signal<Player[]>([]);
  readonly playerStatistics = signal<PlayerStatisticsModalStatistics[]>([]);
  readonly player = signal<Player | null>(null);
  readonly playerCards = signal<PlayerCard[]>([]);

  readonly isGameSessionsTableSorting = signal(false);
  readonly isPlayersModalShown = signal(false);
  readonly isPlayerModalShown = signal(false);
  readonly isPlayerStatisticsModalShown = signal(false);

  readonly playerForm = this.initializePlayerForm();
  private readonly playersSubscription = new Subscription();

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
    this.playersGameSession.set(gameSession);
    this.store.dispatch(loadPlayers({token: gameSession.token}));
    this.subscribeForPlayersChanges(this.store.select(selectPlayers(gameSession.token)));
    this.isPlayersModalShown.set(true);
  }

  showPlayerStatisticsModal(player: Player): void {
    this.playerStatistics.set(this.generatePlayerStatistics(player));
    this.isPlayerStatisticsModalShown.set(true);
  }

  showPlayerModal(player: Player): void {
    this.player.set(player);
    this.playerCards.set(player.playerCards ?? []);
    this.playerForm.patchValue({
      [PlayerFormControls.STATUS_SANITY]: player.status.sanity,
      [PlayerFormControls.STATUS_ENDURANCE]: player.status.endurance,
      [PlayerFormControls.EQUIPMENT_MONEY]: player.equipment.money,
      [PlayerFormControls.EQUIPMENT_CLUES]: player.equipment.clues,
    });
    this.isPlayerModalShown.set(true);
  }

  hidePlayersModal(): void {
    this.isPlayersModalShown.set(false);
    this.playersGameSession.set(null);
    this.playersSubscription.unsubscribe();
  }

  hidePlayerStatisticsModal(): void {
    this.isPlayerStatisticsModalShown.set(false);
    this.playerStatistics.set([]);
  }

  hidePlayerModal(): void {
    this.isPlayerModalShown.set(false);
    this.resetPlayerForm();
  }

  resetPlayerForm(): void {
    this.player.set(null);
    this.playerCards.set([]);
    this.playerForm.reset();
    this.playerForm.markAsPristine();
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

  renewPlayerCharacter(player: Player): void {
    this.store.dispatch(renewPlayerCharacter({
      gameSessionToken: this.playersGameSession()!.token,
      playerToken: player.token
    }));
  }

  deletePlayer(player: Player): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_GameSessionsPage.Delete player',
      message: '_GameSessionsPage.Are you sure you want to delete this player?',
      accept: () => this.store.dispatch(removePlayer({
        gameSessionToken: this.playersGameSession()!.token,
        playerToken: player.token
      })),
    });
  }

  async submitPlayerForm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (FormValidationService.isFormInvalid(this.playerForm)) {
        return resolve(false);
      }

      const updatePlayerPayload = {
        status: {
          sanity: this.playerForm.controls[PlayerFormControls.STATUS_SANITY].value as number,
          endurance: this.playerForm.controls[PlayerFormControls.STATUS_ENDURANCE].value as number,
        },
        equipment: {
          money: this.playerForm.controls[PlayerFormControls.EQUIPMENT_MONEY].value as number,
          clues: this.playerForm.controls[PlayerFormControls.EQUIPMENT_CLUES].value as number,
        },
        attributes: {
          speed: this.playerForm.controls[PlayerFormControls.ATTRIBUTES_SPEED].value as number,
          sneak: this.playerForm.controls[PlayerFormControls.ATTRIBUTES_SNEAK].value as number,
          prowess: this.playerForm.controls[PlayerFormControls.ATTRIBUTES_PROWESS].value as number,
          will: this.playerForm.controls[PlayerFormControls.ATTRIBUTES_WILL].value as number,
          knowledge: this.playerForm.controls[PlayerFormControls.ATTRIBUTES_KNOWLEDGE].value as number,
          luck: this.playerForm.controls[PlayerFormControls.ATTRIBUTES_LUCK].value as number,
        },
      };

      const assignPlayerCardsPayload = {
        card_ids: this.generateAddedCardIds(this.player()!.playerCards ?? [], this.playerCards())
      }

      const removePlayerCardsPayload = {
        card_ids: this.generateRemovedCardIds(this.player()!.playerCards ?? [], this.playerCards())
      }

      this.store.dispatch(updatePlayer({
        gameSessionToken: this.playersGameSession()!.token,
        playerToken: this.player()!.token,
        updatePlayerPayload,
        assignPlayerCardsPayload,
        removePlayerCardsPayload
      }));
      resolve(true);
    });
  }

  private generateAddedCardIds(previousPlayerCards: PlayerCard[], newPlayerCards: PlayerCard[]): number[] {
    const newCards = CardSelectorService.getNewCards(previousPlayerCards, newPlayerCards);
    return CardSelectorService.getSelectedCardsIdsArray(newCards);
  }

  private generateRemovedCardIds(previousPlayerCards: PlayerCard[], newPlayerCards: PlayerCard[]): number[] {
    const removedCards = CardSelectorService.getRemovedCards(previousPlayerCards, newPlayerCards);
    return CardSelectorService.getSelectedCardsIdsArray(removedCards);
  }

  private subscribeForGameSessionsChanges(): void {
    this.gameSessions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.gameSessions.set(value));
  }

  private generatePlayerStatistics(player: Player): PlayerStatisticsModalStatistics[] {
    const entries = Object.entries(player.statistics);
    return entries.map(([key, value]) => ({key, value} as PlayerStatisticsModalStatistics));
  }

  private subscribeForGameSessionsStatusChanges(): void {
    this.gameSessionsStatus$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.gameSessionsStatus.set(value));
  }

  private subscribeForPlayersChanges(players$: Observable<Player[]>): void {
    this.playersSubscription.add(
      players$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.players.set(value)),
    );
  }

  private initializePlayerForm(): FormGroup<PlayerForm> {
    return new FormGroup<PlayerForm>({
      [PlayerFormControls.STATUS_ENDURANCE]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.STATUS_ENDURANCE],
      }),
      [PlayerFormControls.STATUS_SANITY]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.STATUS_SANITY],
      }),
      [PlayerFormControls.EQUIPMENT_MONEY]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.EQUIPMENT_MONEY],
      }),
      [PlayerFormControls.EQUIPMENT_CLUES]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.EQUIPMENT_CLUES],
      }),
      [PlayerFormControls.ATTRIBUTES_SPEED]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.ATTRIBUTES_SPEED],
      }),
      [PlayerFormControls.ATTRIBUTES_SNEAK]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.ATTRIBUTES_SNEAK],
      }),
      [PlayerFormControls.ATTRIBUTES_PROWESS]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.ATTRIBUTES_PROWESS],
      }),
      [PlayerFormControls.ATTRIBUTES_WILL]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.ATTRIBUTES_WILL],
      }),
      [PlayerFormControls.ATTRIBUTES_KNOWLEDGE]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.ATTRIBUTES_KNOWLEDGE],
      }),
      [PlayerFormControls.ATTRIBUTES_LUCK]: new FormControl(null, {
        validators: PLAYER_FORM_VALIDATORS[PlayerFormControls.ATTRIBUTES_LUCK],
      }),
      [PlayerFormControls.ADD_CARD_IDS]: new FormControl(null),
      [PlayerFormControls.REMOVE_CARD_IDS]: new FormControl(null),
    });
  }
}
