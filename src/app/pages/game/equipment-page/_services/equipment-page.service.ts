import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { CHARACTER_PAGE_CONFIG } from '@Pages/game/character-page/_configs/character-page.config';
import { GameSimpleFormControlConfig } from '@Layouts/game-layout/_types/game-simple-form-control-config.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { GameEquipmentFormControls } from '@Enums/form-controls/game-equipment-form-controls.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdatePlayerPayload } from '@Types/payloads/players/update-player-payload.type';
import { Store } from '@ngrx/store';
import { GameLayoutService } from '@Layouts/game-layout/_services/game-layout.service';
import { GameEquipmentForm } from '@Types/forms/game-equipment-form.type';
import { updatePlayer, updatePlayerCards } from '@States/game/game.actions';
import { EQUIPMENT_PAGE_CONFIG } from '@Pages/game/equipment-page/_configs/equipment-page.config';
import { PlayerCard } from '@Models/player-card.model';
import { AssignPlayerCardsPayload } from '@Types/payloads/players/assign-player-cards-payload.type';
import { CardSelectorService } from '@Components/card-selector/card-selector.service';
import { RemovePlayerCardsPayload } from '@Types/payloads/players/remove-player-cards-payload.type';

@Injectable({
  providedIn: 'root',
})
export class EquipmentPageService {
  private readonly store = inject(Store);
  private readonly gameLayoutService = inject(GameLayoutService);
  private readonly destroyRef = inject(DestroyRef);

  readonly player = this.gameLayoutService.player;
  readonly gameSession = this.gameLayoutService.gameSession;
  readonly isFirstLoading = this.gameLayoutService.isFirstLoading;

  readonly selectedPlayerCards = signal<PlayerCard[]>([]);
  readonly playerEquipment = {
    money: signal<number | null>(null),
    clues: signal<number | null>(null),
  };

  readonly gameEquipmentForm = this.initializeGameEquipmentForm();
  updatePlayerTimeout: ReturnType<typeof setTimeout> | null = null;
  updateCardsTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.listenToStoreChanges();
    this.listenToFormChanges();
  }

  increaseMoney(): void {
    this.changeSimpleFormControlValue(GameEquipmentFormControls.MONEY, 1);
  }

  decreaseMoney(): void {
    this.changeSimpleFormControlValue(GameEquipmentFormControls.MONEY, -1);
  }

  increaseClues(): void {
    this.changeSimpleFormControlValue(GameEquipmentFormControls.CLUES, 1);
  }

  decreaseClues(): void {
    this.changeSimpleFormControlValue(GameEquipmentFormControls.CLUES, -1);
  }

  updatePlayerCards(playerCards: PlayerCard[]): void {
    if (this.updateCardsTimeout) {
      clearTimeout(this.updateCardsTimeout);
      this.updateCardsTimeout = null;
    }

    const assignPlayerCardsPayload: AssignPlayerCardsPayload = {
      card_ids: this.generateAddedCardIds(this.player()!.playerCards ?? [], playerCards),
    };

    const removePlayerCardsPayload: RemovePlayerCardsPayload = {
      card_ids: this.generateRemovedCardIds(this.player()!.playerCards ?? [], playerCards),
    };

    this.updateCardsTimeout = setTimeout(
      () =>
        this.store.dispatch(
          updatePlayerCards({
            gameSessionToken: this.gameSession()!.token,
            playerToken: this.player()!.token,
            assignPlayerCardsPayload,
            removePlayerCardsPayload,
          }),
        ),
      CHARACTER_PAGE_CONFIG.updatePlayerDebounceTime,
    );
  }

  private changeSimpleFormControlValue(control: GameEquipmentFormControls, modifier: number): void {
    const oldValue = this.gameEquipmentForm.controls[control].value;

    if (oldValue === null) {
      return;
    }

    const newValue = oldValue + modifier;

    const config = EQUIPMENT_PAGE_CONFIG[control as keyof typeof EQUIPMENT_PAGE_CONFIG] as GameSimpleFormControlConfig;

    if (newValue < config.min) {
      this.gameEquipmentForm.controls[control].setValue(config.min);
      return;
    }

    if (newValue > config.max) {
      this.gameEquipmentForm.controls[control].setValue(config.max);
      return;
    }

    this.gameEquipmentForm.controls[control].setValue(
      (this.gameEquipmentForm.controls[control].value as number) + modifier,
    );
  }

  private listenToFormChanges(): void {
    this.gameEquipmentForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
      .subscribe((value) => {
        this.playerEquipment.money.set(value[GameEquipmentFormControls.MONEY] ?? null);
        this.playerEquipment.clues.set(value[GameEquipmentFormControls.CLUES] ?? null);
        this.updatePlayer();
      });
  }

  private listenToStoreChanges(): void {
    this.gameLayoutService.player$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((player) => player !== null),
        take(1),
      )
      .subscribe((value) => {
        this.gameEquipmentForm.setValue({
          [GameEquipmentFormControls.MONEY]: value.equipment.money,
          [GameEquipmentFormControls.CLUES]: value.equipment.clues,
        });
        this.playerEquipment.money.set(value.equipment.money);
        this.playerEquipment.clues.set(value.equipment.clues);
        this.selectedPlayerCards.set(value.playerCards ?? []);
      });
  }

  private initializeGameEquipmentForm(): FormGroup<GameEquipmentForm> {
    return new FormGroup<GameEquipmentForm>({
      [GameEquipmentFormControls.MONEY]: new FormControl<number | null>(null),
      [GameEquipmentFormControls.CLUES]: new FormControl<number | null>(null),
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

  private updatePlayer(): void {
    if (this.updatePlayerTimeout) {
      clearTimeout(this.updatePlayerTimeout);
      this.updatePlayerTimeout = null;
    }

    const formValues = this.gameEquipmentForm.value;

    if (Object.entries(formValues).some(([key, value]) => value === null)) {
      return;
    }

    this.updatePlayerTimeout = setTimeout(() => {
      const payload: UpdatePlayerPayload = {
        equipment: {
          money: formValues[GameEquipmentFormControls.MONEY]!,
          clues: formValues[GameEquipmentFormControls.CLUES]!,
        },
      };

      this.store.dispatch(
        updatePlayer({
          gameSessionToken: this.gameSession()!.token,
          playerToken: this.player()!.token,
          payload,
        }),
      );
    }, CHARACTER_PAGE_CONFIG.updatePlayerDebounceTime);
  }
}
