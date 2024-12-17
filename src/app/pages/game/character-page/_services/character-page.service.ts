import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '@Services/local-storage.service';
import { Player } from '@Models/player.model';
import { FormControl, FormGroup } from '@angular/forms';
import { GameCharacterForm } from '@Types/forms/game-character-form.type';
import { GameCharacterFormControls } from '@Enums/form-controls/game-character-form-controls.enum';
import { CHARACTER_PAGE_CONFIG } from '@Pages/game/character-page/_configs/character-page.config';
import { GameCharacterFormControlConfig } from '@Pages/game/character-page/_types/game-character-form-control-config.type';
import { Character } from '@Models/character.model';
import { UpdatePlayerPayload } from '@Types/payloads/players/update-player-payload.type';
import { Store } from '@ngrx/store';
import { updatePlayer } from '@States/game/game.actions';

@Injectable({
  providedIn: 'root',
})
export class CharacterPageService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly store = inject(Store);

  readonly player = signal<Player | null>(this.localStorageService.player);
  readonly playerStatus = {
    sanity: signal<number | null>(null),
    endurance: signal<number | null>(null),
  };
  readonly character = computed<Character | null>(() => this.player()?.character ?? null);

  readonly gameCharacterForm = this.initializeGameCharacterForm();
  updatePlayerTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.listenToFormChanges();
  }

  increaseSanity(): void {
    this.changeSimpleFormControlValue(GameCharacterFormControls.SANITY, 1);
  }

  decreaseSanity(): void {
    this.changeSimpleFormControlValue(GameCharacterFormControls.SANITY, -1);
  }

  increaseEndurance(): void {
    this.changeSimpleFormControlValue(GameCharacterFormControls.ENDURANCE, 1);
  }

  decreaseEndurance(): void {
    this.changeSimpleFormControlValue(GameCharacterFormControls.ENDURANCE, -1);
  }

  private changeSimpleFormControlValue(control: GameCharacterFormControls, modifier: number): void {
    const oldValue = this.gameCharacterForm.controls[control].value;

    if (oldValue === null) {
      return;
    }

    const newValue = oldValue + modifier;
    const config = CHARACTER_PAGE_CONFIG[
      control as keyof typeof CHARACTER_PAGE_CONFIG
    ] as GameCharacterFormControlConfig;

    if (newValue < config.min) {
      this.gameCharacterForm.controls[control].setValue(config.min);
      return;
    }

    if (newValue > config.max) {
      this.gameCharacterForm.controls[control].setValue(config.max);
      return;
    }

    this.gameCharacterForm.controls[control].setValue(
      (this.gameCharacterForm.controls[control].value as number) + modifier,
    );
  }

  private listenToFormChanges(): void {
    this.gameCharacterForm.valueChanges.subscribe((value) => {
      this.playerStatus.sanity.set(value[GameCharacterFormControls.SANITY] ?? null);
      this.playerStatus.endurance.set(value[GameCharacterFormControls.ENDURANCE] ?? null);
      this.updatePlayer();
    });
  }

  private initializeGameCharacterForm(): FormGroup<GameCharacterForm> {
    return new FormGroup<GameCharacterForm>({
      [GameCharacterFormControls.SANITY]: new FormControl<number | null>(this.player()?.status.sanity ?? null),
      [GameCharacterFormControls.ENDURANCE]: new FormControl<number | null>(this.player()?.status.endurance ?? null),
      [GameCharacterFormControls.ATTRIBUTES_SPEED]: new FormControl<number | null>(
        this.player()?.attributes.speed ?? null,
      ),
      [GameCharacterFormControls.ATTRIBUTES_SNEAK]: new FormControl<number | null>(
        this.player()?.attributes.sneak ?? null,
      ),
      [GameCharacterFormControls.ATTRIBUTES_PROWESS]: new FormControl<number | null>(
        this.player()?.attributes.prowess ?? null,
      ),
      [GameCharacterFormControls.ATTRIBUTES_WILL]: new FormControl<number | null>(
        this.player()?.attributes.will ?? null,
      ),
      [GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE]: new FormControl<number | null>(
        this.player()?.attributes.knowledge ?? null,
      ),
      [GameCharacterFormControls.ATTRIBUTES_LUCK]: new FormControl<number | null>(
        this.player()?.attributes.luck ?? null,
      ),
    });
  }

  private updatePlayer(): void {
    if (this.updatePlayerTimeout) {
      clearTimeout(this.updatePlayerTimeout);
      this.updatePlayerTimeout = null;
    }

    const formValues = this.gameCharacterForm.value;

    if (Object.entries(formValues).some(([key, value]) => value === null)) {
      return;
    }

    this.updatePlayerTimeout = setTimeout(() => {
      const gameSessionToken = this.localStorageService.gameSession!.token;
      const playerToken = this.player()!.token;

      const payload: UpdatePlayerPayload = {
        status: {
          sanity: formValues[GameCharacterFormControls.SANITY]!,
          endurance: formValues[GameCharacterFormControls.ENDURANCE]!,
        },
        attributes: {
          speed: formValues[GameCharacterFormControls.ATTRIBUTES_SPEED]!,
          sneak: formValues[GameCharacterFormControls.ATTRIBUTES_SNEAK]!,
          prowess: formValues[GameCharacterFormControls.ATTRIBUTES_PROWESS]!,
          will: formValues[GameCharacterFormControls.ATTRIBUTES_WILL]!,
          knowledge: formValues[GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE]!,
          luck: formValues[GameCharacterFormControls.ATTRIBUTES_LUCK]!,
        },
      };

      this.store.dispatch(updatePlayer({ gameSessionToken, playerToken, payload }));
    }, CHARACTER_PAGE_CONFIG.updatePlayerDebounceTime);
  }
}
