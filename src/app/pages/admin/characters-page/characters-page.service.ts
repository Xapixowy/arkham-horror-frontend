import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { Character } from '@Models/character.model';
import { CHARACTER_STATE_CONFIG } from '@State/characters/character.config';
import {
  selectCharacters,
  selectCharacterStatus,
  selectCharacterTranslations,
} from '@State/characters/character.selectors';
import { StateStatus } from '@Enums/state-status.enum';
import {
  addCharacter,
  addCharacterTranslation,
  loadCharacters,
  loadCharacterTranslations,
  removeCharacter,
  removeCharacterTranslation,
  updateCharacter,
  updateCharacterTranslation,
} from '@State/characters/character.actions';
import { TableHelper } from '@Helpers/table.helper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalMode } from '@Enums/modal-mode.enum';
import { Skill } from '@Types/characters/skill.type';
import { CharacterTranslation } from '@Models/character-translation.model';
import { Observable, Subscription } from 'rxjs';
import { getEnumValues } from 'ts-enum-helpers';
import { FormControl, FormGroup } from '@angular/forms';
import { CharacterForm } from '@Types/forms/character-form.type';
import { CharacterFormControls } from '@Enums/form-controls/character-form-controls.enum';
import { CHARACTER_FORM_VALIDATORS } from '@Configs/form-validators/character-form-validators.config';
import { FormValidationService } from '@Services/form-validation.service';
import { Expansion } from '@Enums/expansion.enum';
import { CharacterCard } from '@Models/character-card.model';
import { CardSelectorService } from '@Components/card-selector/card-selector.service';
import { Language } from '@Features/language/_enums/language.enum';
import { CharacterTranslationForm } from '@Types/forms/character-translation-form.type';
import { CharacterTranslationFormControls } from '@Enums/form-controls/character-translation-form-controls.enum';
import { CHARACTER_TRANSLATION_FORM_VALIDATORS } from '@Configs/form-validators/character-translation-form-validators.config';

@Injectable({
  providedIn: 'root',
})
export class CharactersPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly characters$ = this.store.select(selectCharacters);
  private readonly characterStatus$ = this.store.select(selectCharacterStatus);

  readonly characters = signal<Character[]>(CHARACTER_STATE_CONFIG.initialState.characters);
  readonly characterStatus = signal<StateStatus>(CHARACTER_STATE_CONFIG.initialState.status);

  readonly isCharactersTableSorting = signal<boolean>(false);
  readonly isCharacterModalShown = signal<boolean>(false);
  readonly isCharacterTranslationsModalShown = signal<boolean>(false);
  readonly isCharacterTranslationModalShown = signal<boolean>(false);
  readonly isCharacterSkillModalShown = signal<boolean>(false);
  readonly isCharacterTranslationSkillModalShown = signal<boolean>(false);
  readonly characterModalMode = signal<ModalMode>(ModalMode.CREATE);
  readonly characterTranslationModalMode = signal<ModalMode>(ModalMode.CREATE);
  readonly characterModalSkills = signal<Skill[]>([]);
  readonly characterTranslationModalSkills = signal<Skill[]>([]);
  readonly selectedCharacterCards = signal<CharacterCard[]>([]);
  readonly characterTranslations = signal<CharacterTranslation[]>([]);
  readonly characterTranslationsCharacterId = signal<number | null>(null);

  readonly characterForm = this.initializeCharacterForm();
  readonly characterTranslationForm = this.initializeCharacterTranslationForm();
  readonly expansions: string[] = getEnumValues(Expansion);

  readonly characterTranslationsSubscription = new Subscription();

  constructor() {
    this.subscribeForCharactersChanges();
    this.store.dispatch(loadCharacters());
  }

  removeCharacter(id: number): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_CharactersPage.Delete character',
      message: '_CharactersPage.Are you sure you want to delete this character?',
      accept: () => this.store.dispatch(removeCharacter({ id })),
    });
  }

  removeCharacterTranslation(characterId: number, locale: Language): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_CharactersPage.Delete character translation',
      message: '_CharactersPage.Are you sure you want to delete this character translation?',
      accept: () => this.store.dispatch(removeCharacterTranslation({ characterId, locale })),
    });
  }

  sortCharacters(event: SortEvent): void {
    if (this.isCharactersTableSorting()) {
      return;
    }
    this.isCharactersTableSorting.set(true);
    this.characters.set(TableHelper.sort<Character>(event, this.characters()));
    setTimeout(() => this.isCharactersTableSorting.set(false), 0);
  }

  setCharacterImageFormValue(photo: File | null): void {
    this.characterForm.controls[CharacterFormControls.IMAGE].setValue(photo);
  }

  async showCharacterModal(character?: Character): Promise<void> {
    this.characterModalMode.set(character ? ModalMode.EDIT : ModalMode.CREATE);
    if (character) {
      this.characterForm.patchValue({
        [CharacterFormControls.ID]: character.id,
        [CharacterFormControls.EXPANSION]: character.expansion,
        [CharacterFormControls.NAME]: character.name,
        [CharacterFormControls.DESCRIPTION]: character.description,
        [CharacterFormControls.PROFESSION]: character.profession,
        [CharacterFormControls.STARTING_LOCATION]: character.starting_location,
        [CharacterFormControls.SANITY]: character.sanity,
        [CharacterFormControls.ENDURANCE]: character.endurance,
        [CharacterFormControls.CONCENTRATION]: character.concentration,
        [CharacterFormControls.SKILLS]: character.skills,
        [CharacterFormControls.ATTRIBUTES_SPEED]: character.attributes.speed.join(''),
        [CharacterFormControls.ATTRIBUTES_SNEAK]: character.attributes.sneak.join(''),
        [CharacterFormControls.ATTRIBUTES_PROWESS]: character.attributes.prowess.join(''),
        [CharacterFormControls.ATTRIBUTES_WILL]: character.attributes.will.join(''),
        [CharacterFormControls.ATTRIBUTES_KNOWLEDGE]: character.attributes.knowledge.join(''),
        [CharacterFormControls.ATTRIBUTES_LUCK]: character.attributes.luck.join(''),
        [CharacterFormControls.EQUIPMENT_MONEY]: character.equipment.money,
        [CharacterFormControls.EQUIPMENT_CLUES]: character.equipment.clues,
        [CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS]: character.equipment.random.common_items,
        [CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS]: character.equipment.random.unique_items,
        [CharacterFormControls.EQUIPMENT_RANDOM_SPELLS]: character.equipment.random.spells,
        [CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES]: character.equipment.random.abilities,
        [CharacterFormControls.EQUIPMENT_RANDOM_ALLIES]: character.equipment.random.allies,
      });
      this.characterModalSkills.set(character.skills ?? []);
      this.selectedCharacterCards.set(character.characterCards ?? []);
    }
    this.isCharacterModalShown.set(true);
  }

  showCharacterSkillModal(): void {
    this.isCharacterSkillModalShown.set(true);
  }

  showCharacterTranslationSkillModal(): void {
    this.isCharacterTranslationSkillModalShown.set(true);
  }

  showCharacterTranslationsModal(characterId: number): void {
    this.store.dispatch(loadCharacterTranslations({ characterId }));
    this.subscribeForCharacterTranslationsChanges(this.store.select(selectCharacterTranslations(characterId)));
    this.characterTranslationsCharacterId.set(characterId);
    this.isCharacterTranslationsModalShown.set(true);
  }

  showCharacterTranslationModal(language: Language, characterTranslation?: CharacterTranslation): void {
    this.characterTranslationModalMode.set(characterTranslation ? ModalMode.EDIT : ModalMode.CREATE);
    if (characterTranslation) {
      this.characterTranslationForm.patchValue({
        [CharacterTranslationFormControls.ID]: characterTranslation.id,
        [CharacterTranslationFormControls.NAME]: characterTranslation.name,
        [CharacterTranslationFormControls.DESCRIPTION]: characterTranslation.description,
        [CharacterTranslationFormControls.PROFESSION]: characterTranslation.profession,
        [CharacterTranslationFormControls.STARTING_LOCATION]: characterTranslation.starting_location,
        [CharacterTranslationFormControls.SKILLS]: characterTranslation.skills,
        [CharacterTranslationFormControls.LOCALE]: language,
      });
      this.characterTranslationModalSkills.set(characterTranslation.skills ?? []);
    } else {
      this.characterTranslationForm.patchValue({
        [CharacterTranslationFormControls.LOCALE]: language,
      });
    }
    this.isCharacterTranslationModalShown.set(true);
  }

  hideCharacterModal(): void {
    this.isCharacterModalShown.set(false);
    this.resetCharacterForm();
  }

  hideCharacterTranslationsModal(): void {
    this.isCharacterTranslationsModalShown.set(false);
    this.characterTranslationsCharacterId.set(null);
    this.characterTranslations.set([]);
    this.characterTranslationsSubscription.unsubscribe();
  }

  hideCharacterTranslationModal(): void {
    this.isCharacterTranslationModalShown.set(false);
    this.resetCharacterTranslationForm();
  }

  resetCharacterForm(): void {
    this.characterForm.reset();
    this.characterModalSkills.set([]);
    this.selectedCharacterCards.set([]);
    this.characterForm.markAsPristine();
  }

  resetCharacterTranslationForm(): void {
    this.characterTranslationForm.reset();
    this.characterTranslationModalSkills.set([]);
    this.characterTranslationForm.markAsPristine();
  }

  async submitCharacterForm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.characterForm.controls[CharacterFormControls.SKILLS].setValue(this.characterModalSkills());
      this.characterForm.controls[CharacterFormControls.CARD_IDS].setValue(
        CardSelectorService.getSelectedCardsIdsArray(this.selectedCharacterCards()),
      );

      if (FormValidationService.isFormInvalid(this.characterForm)) {
        return resolve(false);
      }

      const payload = {
        expansion: this.characterForm.controls[CharacterFormControls.EXPANSION].value as Expansion,
        name: this.characterForm.controls[CharacterFormControls.NAME].value as string,
        description: this.characterForm.controls[CharacterFormControls.DESCRIPTION].value as string,
        profession: this.characterForm.controls[CharacterFormControls.PROFESSION].value as string,
        starting_location: this.characterForm.controls[CharacterFormControls.STARTING_LOCATION].value as string,
        sanity: this.characterForm.controls[CharacterFormControls.SANITY].value as number,
        endurance: this.characterForm.controls[CharacterFormControls.ENDURANCE].value as number,
        concentration: this.characterForm.controls[CharacterFormControls.CONCENTRATION].value as number,
        attributes: {
          speed: this.characterForm.controls[CharacterFormControls.ATTRIBUTES_SPEED]
            .value!.split('')
            .map((value) => parseInt(value)) as [number, number, number, number],
          sneak: this.characterForm.controls[CharacterFormControls.ATTRIBUTES_SNEAK]
            .value!.split('')
            .map((value) => parseInt(value)) as [number, number, number, number],
          prowess: this.characterForm.controls[CharacterFormControls.ATTRIBUTES_PROWESS]
            .value!.split('')
            .map((value) => parseInt(value)) as [number, number, number, number],
          will: this.characterForm.controls[CharacterFormControls.ATTRIBUTES_WILL]
            .value!.split('')
            .map((value) => parseInt(value)) as [number, number, number, number],
          knowledge: this.characterForm.controls[CharacterFormControls.ATTRIBUTES_KNOWLEDGE]
            .value!.split('')
            .map((value) => parseInt(value)) as [number, number, number, number],
          luck: this.characterForm.controls[CharacterFormControls.ATTRIBUTES_LUCK]
            .value!.split('')
            .map((value) => parseInt(value)) as [number, number, number, number],
        },
        skills: this.characterForm.controls[CharacterFormControls.SKILLS].value as Skill[],
        equipment: {
          money: this.characterForm.controls[CharacterFormControls.EQUIPMENT_MONEY].value as number,
          clues: this.characterForm.controls[CharacterFormControls.EQUIPMENT_CLUES].value as number,
          random: {
            common_items: this.characterForm.controls[CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS]
              .value as number,
            unique_items: this.characterForm.controls[CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS]
              .value as number,
            spells: this.characterForm.controls[CharacterFormControls.EQUIPMENT_RANDOM_SPELLS].value as number,
            abilities: this.characterForm.controls[CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES].value as number,
            allies: this.characterForm.controls[CharacterFormControls.EQUIPMENT_RANDOM_ALLIES].value as number,
          },
        },
        card_ids: this.characterForm.controls[CharacterFormControls.CARD_IDS].value as number[],
      };

      if (this.characterModalMode() === ModalMode.CREATE) {
        this.store.dispatch(
          addCharacter({
            payload,
            image: this.characterForm.controls[CharacterFormControls.IMAGE].value as File,
          }),
        );
      } else {
        this.store.dispatch(
          updateCharacter({
            characterId: this.characterForm.controls[CharacterFormControls.ID].value as number,
            payload,
            image: this.characterForm.controls[CharacterFormControls.IMAGE].value as File,
          }),
        );
      }

      this.resetCharacterForm();
      resolve(true);
    });
  }

  async submitCharacterTranslationForm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.characterTranslationForm.controls[CharacterTranslationFormControls.SKILLS].setValue(
        this.characterTranslationModalSkills(),
      );

      if (FormValidationService.isFormInvalid(this.characterTranslationForm)) {
        return resolve(false);
      }

      const payload = {
        name: this.characterTranslationForm.controls[CharacterTranslationFormControls.NAME].value as string,
        description: this.characterTranslationForm.controls[CharacterTranslationFormControls.DESCRIPTION]
          .value as string,
        profession: this.characterTranslationForm.controls[CharacterTranslationFormControls.PROFESSION].value as string,
        starting_location: this.characterTranslationForm.controls[CharacterTranslationFormControls.STARTING_LOCATION]
          .value as string,
        skills: this.characterTranslationForm.controls[CharacterTranslationFormControls.SKILLS].value as Skill[],
      };

      if (this.characterTranslationModalMode() === ModalMode.CREATE) {
        this.store.dispatch(
          addCharacterTranslation({
            characterId: this.characterTranslationsCharacterId()!,
            payload: {
              ...payload,
              locale: this.characterTranslationForm.controls[CharacterTranslationFormControls.LOCALE].value as Language,
            },
          }),
        );
      } else {
        this.store.dispatch(
          updateCharacterTranslation({
            characterId: this.characterTranslationsCharacterId()!,
            locale: this.characterTranslationForm.controls[CharacterTranslationFormControls.LOCALE].value as Language,
            payload,
          }),
        );
      }

      this.resetCharacterTranslationForm();
      resolve(true);
    });
  }

  private subscribeForCharactersChanges(): void {
    this.characters$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.characters.set(value));
    this.characterStatus$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.characterStatus.set(value));
  }

  private subscribeForCharacterTranslationsChanges(cardTranslations$: Observable<CharacterTranslation[]>): void {
    this.characterTranslationsSubscription.add(
      cardTranslations$.subscribe((value) => this.characterTranslations.set(value)),
    );
  }

  private initializeCharacterForm(): FormGroup<CharacterForm> {
    return new FormGroup<CharacterForm>({
      [CharacterFormControls.ID]: new FormControl(null),
      [CharacterFormControls.EXPANSION]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EXPANSION],
      }),
      [CharacterFormControls.NAME]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.NAME],
      }),
      [CharacterFormControls.DESCRIPTION]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.DESCRIPTION],
      }),
      [CharacterFormControls.PROFESSION]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.PROFESSION],
      }),
      [CharacterFormControls.STARTING_LOCATION]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.STARTING_LOCATION],
      }),
      [CharacterFormControls.SANITY]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.SANITY],
      }),
      [CharacterFormControls.ENDURANCE]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ENDURANCE],
      }),
      [CharacterFormControls.CONCENTRATION]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.CONCENTRATION],
      }),
      [CharacterFormControls.SKILLS]: new FormControl([], {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.SKILLS],
      }),
      [CharacterFormControls.ATTRIBUTES_SPEED]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ATTRIBUTES_SPEED],
      }),
      [CharacterFormControls.ATTRIBUTES_SNEAK]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ATTRIBUTES_SNEAK],
      }),
      [CharacterFormControls.ATTRIBUTES_PROWESS]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ATTRIBUTES_PROWESS],
      }),
      [CharacterFormControls.ATTRIBUTES_WILL]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ATTRIBUTES_WILL],
      }),
      [CharacterFormControls.ATTRIBUTES_KNOWLEDGE]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ATTRIBUTES_KNOWLEDGE],
      }),
      [CharacterFormControls.ATTRIBUTES_LUCK]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.ATTRIBUTES_LUCK],
      }),
      [CharacterFormControls.EQUIPMENT_MONEY]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_MONEY],
      }),
      [CharacterFormControls.EQUIPMENT_CLUES]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_CLUES],
      }),
      [CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS],
      }),
      [CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS],
      }),
      [CharacterFormControls.EQUIPMENT_RANDOM_SPELLS]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_RANDOM_SPELLS],
      }),
      [CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES],
      }),
      [CharacterFormControls.EQUIPMENT_RANDOM_ALLIES]: new FormControl(null, {
        validators: CHARACTER_FORM_VALIDATORS[CharacterFormControls.EQUIPMENT_RANDOM_ALLIES],
      }),
      [CharacterFormControls.CARD_IDS]: new FormControl(null),
      [CharacterFormControls.IMAGE]: new FormControl(null),
    });
  }

  private initializeCharacterTranslationForm(): FormGroup<CharacterTranslationForm> {
    return new FormGroup<CharacterTranslationForm>({
      [CharacterTranslationFormControls.ID]: new FormControl(null),
      [CharacterTranslationFormControls.NAME]: new FormControl(null, {
        validators: CHARACTER_TRANSLATION_FORM_VALIDATORS[CharacterTranslationFormControls.NAME],
      }),
      [CharacterTranslationFormControls.DESCRIPTION]: new FormControl(null, {
        validators: CHARACTER_TRANSLATION_FORM_VALIDATORS[CharacterTranslationFormControls.DESCRIPTION],
      }),
      [CharacterTranslationFormControls.PROFESSION]: new FormControl(null, {
        validators: CHARACTER_TRANSLATION_FORM_VALIDATORS[CharacterTranslationFormControls.PROFESSION],
      }),
      [CharacterTranslationFormControls.STARTING_LOCATION]: new FormControl(null, {
        validators: CHARACTER_TRANSLATION_FORM_VALIDATORS[CharacterTranslationFormControls.STARTING_LOCATION],
      }),
      [CharacterTranslationFormControls.SKILLS]: new FormControl(null, {
        validators: CHARACTER_TRANSLATION_FORM_VALIDATORS[CharacterTranslationFormControls.SKILLS],
      }),
      [CharacterTranslationFormControls.LOCALE]: new FormControl(null),
    });
  }
}
