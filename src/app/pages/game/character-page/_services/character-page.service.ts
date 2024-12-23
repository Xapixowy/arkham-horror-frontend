import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameCharacterForm } from '@Types/forms/game-character-form.type';
import { GameCharacterFormControls } from '@Enums/form-controls/game-character-form-controls.enum';
import { CHARACTER_PAGE_CONFIG } from '@Pages/game/character-page/_configs/character-page.config';
import { GameSimpleFormControlConfig } from '@Layouts/game-layout/_types/game-simple-form-control-config.type';
import { UpdatePlayerPayload } from '@Types/payloads/players/update-player-payload.type';
import { Store } from '@ngrx/store';
import { updatePlayer } from '@States/game/game.actions';
import { GameLayoutService } from '@Layouts/game-layout/_services/game-layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { AttributeSliderConfig } from '@Components/attribute-slider/_types/attribute-slider-config.type';
import { Character } from '@Models/character.model';
import { WindowEvent } from '@Enums/window-event.enum';

@Injectable({
  providedIn: 'root',
})
export class CharacterPageService {
  private readonly store = inject(Store);
  private readonly gameLayoutService = inject(GameLayoutService);
  private readonly destroyRef = inject(DestroyRef);

  readonly player = this.gameLayoutService.player;
  readonly gameSession = this.gameLayoutService.gameSession;
  readonly gameStatus = this.gameLayoutService.gameStatus;
  readonly isFirstLoading = this.gameLayoutService.isFirstLoading;
  readonly gameSessionPhase = this.gameLayoutService.gameSessionPhase;

  readonly playerStatus = {
    sanity: signal<number | null>(null),
    endurance: signal<number | null>(null),
  };
  readonly attributeSliderConfigs = {
    speedSneak: signal<AttributeSliderConfig | null>(null),
    prowessWill: signal<AttributeSliderConfig | null>(null),
    knowledgeLuck: signal<AttributeSliderConfig | null>(null),
  };

  readonly character = computed<Character | null>(() => this.player()?.character ?? null);

  readonly gameCharacterForm = this.initializeGameCharacterForm();
  updatePlayerTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.listenToStoreChanges();
    this.listenToFormChanges();
    this.listenToCharacterRenewalEvents();
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

    const config = CHARACTER_PAGE_CONFIG[control as keyof typeof CHARACTER_PAGE_CONFIG] as GameSimpleFormControlConfig;

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
    this.gameCharacterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
      .subscribe((value) => {
        this.playerStatus.sanity.set(value[GameCharacterFormControls.SANITY] ?? null);
        this.playerStatus.endurance.set(value[GameCharacterFormControls.ENDURANCE] ?? null);
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
        this.gameCharacterForm.setValue({
          [GameCharacterFormControls.SANITY]: value.status.sanity,
          [GameCharacterFormControls.ENDURANCE]: value.status.endurance,
          [GameCharacterFormControls.ATTRIBUTES_SPEED]: value.attributes.speed,
          [GameCharacterFormControls.ATTRIBUTES_SNEAK]: value.attributes.sneak,
          [GameCharacterFormControls.ATTRIBUTES_PROWESS]: value.attributes.prowess,
          [GameCharacterFormControls.ATTRIBUTES_WILL]: value.attributes.will,
          [GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE]: value.attributes.knowledge,
          [GameCharacterFormControls.ATTRIBUTES_LUCK]: value.attributes.luck,
        });
        this.playerStatus.sanity.set(value.status.sanity);
        this.playerStatus.endurance.set(value.status.endurance);
        this.initializeAttributeSliderConfigs();
      });
  }

  private listenToCharacterRenewalEvents(): void {
    window.addEventListener(WindowEvent.GAME_PLAYER_RENEW_CHARACTER, () => window.location.reload());
  }

  private initializeGameCharacterForm(): FormGroup<GameCharacterForm> {
    return new FormGroup<GameCharacterForm>({
      [GameCharacterFormControls.SANITY]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ENDURANCE]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ATTRIBUTES_SPEED]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ATTRIBUTES_SNEAK]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ATTRIBUTES_PROWESS]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ATTRIBUTES_WILL]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE]: new FormControl<number | null>(null),
      [GameCharacterFormControls.ATTRIBUTES_LUCK]: new FormControl<number | null>(null),
    });
  }

  private initializeAttributeSliderConfigs(): void {
    this.attributeSliderConfigs.speedSneak.set({
      firstAttribute: {
        label: '_CharacterPage.Speed',
        formControl: this.gameCharacterForm.controls[GameCharacterFormControls.ATTRIBUTES_SPEED],
        inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_SPEED}`,
        values: this.character()?.attributes.speed ?? [],
        value: this.player()?.attributes.speed ?? 0,
      },
      secondAttribute: {
        label: '_CharacterPage.Sneak',
        formControl: this.gameCharacterForm.controls[GameCharacterFormControls.ATTRIBUTES_SNEAK],
        inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_SNEAK}`,
        values: this.character()?.attributes.sneak ?? [],
        value: this.player()?.attributes.sneak ?? 0,
      },
    });

    this.attributeSliderConfigs.prowessWill.set({
      firstAttribute: {
        label: '_CharacterPage.Prowess',
        formControl: this.gameCharacterForm.controls[GameCharacterFormControls.ATTRIBUTES_PROWESS],
        inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_PROWESS}`,
        values: this.character()?.attributes.prowess ?? [],
        value: this.player()?.attributes.prowess ?? 0,
      },
      secondAttribute: {
        label: '_CharacterPage.Will',
        formControl: this.gameCharacterForm.controls[GameCharacterFormControls.ATTRIBUTES_WILL],
        inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_WILL}`,
        values: this.character()?.attributes.will ?? [],
        value: this.player()?.attributes.will ?? 0,
      },
    });

    this.attributeSliderConfigs.knowledgeLuck.set({
      firstAttribute: {
        label: '_CharacterPage.Knowledge',
        formControl: this.gameCharacterForm.controls[GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE],
        inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_KNOWLEDGE}`,
        values: this.character()?.attributes.knowledge ?? [],
        value: this.player()?.attributes.knowledge ?? 0,
      },
      secondAttribute: {
        label: '_CharacterPage.Luck',
        formControl: this.gameCharacterForm.controls[GameCharacterFormControls.ATTRIBUTES_LUCK],
        inputId: `${CHARACTER_PAGE_CONFIG.inputIdPrefix}-${GameCharacterFormControls.ATTRIBUTES_LUCK}`,
        values: this.character()?.attributes.luck ?? [],
        value: this.player()?.attributes.luck ?? 0,
      },
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
