import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCards, selectCardStatus, selectCardTranslations } from '@States/cards/card.selectors';
import { Card } from '@Models/card.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  addCard,
  addCardTranslation,
  loadCards,
  loadCardTranslations,
  removeCard,
  removeCardTranslation,
  updateCard,
  updateCardTranslation,
} from '@States/cards/card.actions';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CardForm } from '@Types/forms/card-form.type';
import { CardFormControls } from '@Enums/form-controls/card-form-controls.enum';
import { CardType } from '@Enums/cards/card-type.enum';
import { CardSubtype } from '@Enums/cards/card-subtype.enum';
import { AttributeModifier } from '@Types/cards/attribute-modifier.type';
import { CARD_FORM_VALIDATORS } from '@Configs/form-validators/card-form-validators.config';
import { FormValidationService } from '@Services/form-validation.service';
import { getEnumValues } from 'ts-enum-helpers';
import { ModalMode } from '@Enums/modal-mode.enum';
import { FileHelper } from '@Helpers/file.helper';
import { TableHelper } from '@Helpers/table.helper';
import { CardTranslationForm } from '@Types/forms/card-translation-form.type';
import { CardTranslationFormControls } from '@Enums/form-controls/card-translation-form-controls.enum';
import { CARD_TRANSLATION_FORM_VALIDATORS } from '@Configs/form-validators/card-translation-form-validators.config';
import { Language } from '@Features/language/_enums/language.enum';
import { CardTranslation } from '@Models/card-translation.model';
import { Observable, Subscription } from 'rxjs';
import { StateStatus } from '@Enums/state-status.enum';
import { CARD_STATE_CONFIG } from '@States/cards/card.config';
import { AddCardTranslationPayload } from '@Types/payloads/card-translations/add-card-translation-payload.type';
import { UpdateCardTranslationPayload } from '@Types/payloads/card-translations/update-card-translation-payload.type';
import { AddCardPayload } from '@Types/payloads/cards/add-card-payload.type';
import { UpdateCardPayload } from '@Types/payloads/cards/update-card-payload.type';

@Injectable({
  providedIn: 'root',
})
export class CardsPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly cards$ = this.store.select(selectCards);
  private readonly cardStatus$ = this.store.select(selectCardStatus);

  readonly cards = signal<Card[]>(CARD_STATE_CONFIG.initialState.cards);
  readonly cardStatus = signal<StateStatus>(CARD_STATE_CONFIG.initialState.status);

  readonly isCardsTableSorting = signal(false);
  readonly isCardModalShown = signal(false);
  readonly isCardTranslationsModalShown = signal(false);
  readonly isCardTranslationModalShown = signal(false);
  readonly cardModalMode = signal<ModalMode>(ModalMode.CREATE);
  readonly cardTranslationModalMode = signal<ModalMode>(ModalMode.CREATE);
  readonly attributeModifiers = signal<AttributeModifier[]>([]);
  readonly cardTranslations = signal<CardTranslation[]>([]);
  readonly cardTranslationsCardId = signal<number | null>(null);

  readonly cardForm = this.initializeCardForm();
  readonly cardTranslationForm = this.initializeCardTranslationForm();
  readonly types: CardType[] = getEnumValues(CardType);
  readonly subtypes: CardSubtype[] = getEnumValues(CardSubtype);

  readonly cardTranslationsSubscription = new Subscription();

  constructor() {
    this.subscribeForCardsChanges();
    this.store.dispatch(loadCards());
  }

  removeCard(id: number): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_CardsPage.Delete card',
      message: '_CardsPage.Are you sure you want to delete this card?',
      accept: () => this.store.dispatch(removeCard({ id })),
    });
  }

  removeCardTranslation(cardId: number, locale: Language): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_CardsPage.Delete card translation',
      message: '_CardsPage.Are you sure you want to delete this card translation?',
      accept: () => this.store.dispatch(removeCardTranslation({ cardId, locale })),
    });
  }

  showCardTranslationsModal(cardId: number): void {
    this.store.dispatch(loadCardTranslations({ cardId }));
    this.subscribeForCardTranslationsChanges(this.store.select(selectCardTranslations(cardId)));
    this.cardTranslationsCardId.set(cardId);
    this.isCardTranslationsModalShown.set(true);
  }

  async showCardModal(card?: Card): Promise<void> {
    this.cardModalMode.set(card ? ModalMode.EDIT : ModalMode.CREATE);
    if (card) {
      this.cardForm.patchValue({
        [CardFormControls.ID]: card.id,
        [CardFormControls.NAME]: card.name,
        [CardFormControls.DESCRIPTION]: card.description,
        [CardFormControls.TYPE]: card.type,
        [CardFormControls.SUBTYPE]: card.subtype,
        [CardFormControls.FRONT_IMAGE]: card.front_image_path
          ? await FileHelper.convertImageFromUrlToFile(card.front_image_path)
          : null,
        [CardFormControls.BACK_IMAGE]: card.back_image_path
          ? await FileHelper.convertImageFromUrlToFile(card.back_image_path)
          : null,
        [CardFormControls.ATTRIBUTE_MODIFIERS]: card.attribute_modifiers,
        [CardFormControls.HAND_USAGE]: card.hand_usage,
      });
      this.attributeModifiers.set(card.attribute_modifiers ?? []);
    }
    this.isCardModalShown.set(true);
  }

  showCardTranslationModal(language: Language, cardTranslation?: CardTranslation): void {
    this.cardTranslationModalMode.set(cardTranslation ? ModalMode.EDIT : ModalMode.CREATE);
    if (cardTranslation) {
      this.cardTranslationForm.patchValue({
        [CardTranslationFormControls.ID]: cardTranslation.id,
        [CardTranslationFormControls.NAME]: cardTranslation.name,
        [CardTranslationFormControls.DESCRIPTION]: cardTranslation.description,
        [CardTranslationFormControls.LOCALE]: language,
      });
    } else {
      this.cardTranslationForm.patchValue({
        [CardTranslationFormControls.LOCALE]: language,
      });
    }
    this.isCardTranslationModalShown.set(true);
  }

  hideCardModal(): void {
    this.isCardModalShown.set(false);
    this.resetCardForm();
  }

  hideCardTranslationsModal(): void {
    this.isCardTranslationsModalShown.set(false);
    this.cardTranslationsCardId.set(null);
    this.cardTranslations.set([]);
    this.cardTranslationsSubscription.unsubscribe();
  }

  hideCardTranslationModal(): void {
    this.isCardTranslationModalShown.set(false);
    this.resetCardTranslationForm();
  }

  async submitCardForm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (FormValidationService.isFormInvalid(this.cardForm)) {
        return resolve(false);
      }

      this.cardForm.controls[CardFormControls.ATTRIBUTE_MODIFIERS].setValue(this.attributeModifiers());

      if (this.cardModalMode() === ModalMode.CREATE) {
        this.store.dispatch(
          addCard({
            payload: {
              name: this.cardForm.controls[CardFormControls.NAME].value as string,
              description: this.cardForm.controls[CardFormControls.DESCRIPTION].value as string,
              type: this.cardForm.controls[CardFormControls.TYPE].value as CardType,
              subtype: this.cardForm.controls[CardFormControls.SUBTYPE].value as CardSubtype,
              attribute_modifiers: this.attributeModifiers(),
              hand_usage: this.cardForm.controls[CardFormControls.HAND_USAGE].value as number,
            } as AddCardPayload,
            frontImage: this.cardForm.controls[CardFormControls.FRONT_IMAGE].value as File,
            backImage: this.cardForm.controls[CardFormControls.BACK_IMAGE].value as File,
          }),
        );
      } else {
        this.store.dispatch(
          updateCard({
            cardId: this.cardForm.controls[CardFormControls.ID].value as number,
            payload: {
              name: this.cardForm.controls[CardFormControls.NAME].value as string,
              description: this.cardForm.controls[CardFormControls.DESCRIPTION].value as string,
              type: this.cardForm.controls[CardFormControls.TYPE].value as CardType,
              subtype: this.cardForm.controls[CardFormControls.SUBTYPE].value as CardSubtype,
              attribute_modifiers: this.cardForm.controls[CardFormControls.ATTRIBUTE_MODIFIERS]
                .value as AttributeModifier[],
              hand_usage: this.cardForm.controls[CardFormControls.HAND_USAGE].value as number,
            } as UpdateCardPayload,
            frontImage: this.cardForm.controls[CardFormControls.FRONT_IMAGE].value as File,
            backImage: this.cardForm.controls[CardFormControls.BACK_IMAGE].value as File,
          }),
        );
      }

      this.resetCardForm();
      resolve(true);
    });
  }

  async submitCardTranslationForm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (FormValidationService.isFormInvalid(this.cardTranslationForm)) {
        return resolve(false);
      }

      if (this.cardTranslationModalMode() === ModalMode.CREATE) {
        this.store.dispatch(
          addCardTranslation({
            cardId: this.cardTranslationsCardId()!,
            payload: {
              name: this.cardTranslationForm.controls[CardTranslationFormControls.NAME].value as string,
              description: this.cardTranslationForm.controls[CardTranslationFormControls.DESCRIPTION].value as string,
              locale: this.cardTranslationForm.controls[CardTranslationFormControls.LOCALE].value as Language,
            } as AddCardTranslationPayload,
          }),
        );
      } else {
        this.store.dispatch(
          updateCardTranslation({
            cardId: this.cardTranslationsCardId()!,
            locale: this.cardTranslationForm.controls[CardTranslationFormControls.LOCALE].value as Language,
            payload: {
              name: this.cardTranslationForm.controls[CardTranslationFormControls.NAME].value as string,
              description: this.cardTranslationForm.controls[CardTranslationFormControls.DESCRIPTION].value as string,
            } as UpdateCardTranslationPayload,
          }),
        );
      }

      this.resetCardTranslationForm();
      resolve(true);
    });
  }

  resetCardForm(): void {
    this.cardForm.reset();
    this.attributeModifiers.set([]);
    this.cardForm.markAsPristine();
  }

  resetCardTranslationForm(): void {
    this.cardTranslationForm.reset();
    this.cardTranslationForm.markAsPristine();
  }

  setFrontImageFormValue(photo: File | null): void {
    this.cardForm.controls[CardFormControls.FRONT_IMAGE].setValue(photo);
  }

  setBackImageFormValue(photo: File | null): void {
    this.cardForm.controls[CardFormControls.BACK_IMAGE].setValue(photo);
  }

  sortCards(event: SortEvent): void {
    if (this.isCardsTableSorting()) {
      return;
    }
    this.isCardsTableSorting.set(true);
    this.cards.set(TableHelper.sort<Card>(event, this.cards()));
    setTimeout(() => this.isCardsTableSorting.set(false), 0);
  }

  private subscribeForCardsChanges(): void {
    this.cards$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.cards.set(value));
    this.cardStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.cardStatus.set(value));
  }

  private subscribeForCardTranslationsChanges(cardTranslations$: Observable<CardTranslation[]>): void {
    this.cardTranslationsSubscription.add(cardTranslations$.subscribe((value) => this.cardTranslations.set(value)));
  }

  private initializeCardForm(): FormGroup<CardForm> {
    return new FormGroup<CardForm>({
      [CardFormControls.ID]: new FormControl<number | null>(null),
      [CardFormControls.NAME]: new FormControl<string | null>(null, {
        validators: CARD_FORM_VALIDATORS[CardFormControls.NAME],
      }),
      [CardFormControls.DESCRIPTION]: new FormControl<string | null>(null, {
        validators: CARD_FORM_VALIDATORS[CardFormControls.DESCRIPTION],
      }),
      [CardFormControls.TYPE]: new FormControl<CardType | null>(null, {
        validators: CARD_FORM_VALIDATORS[CardFormControls.TYPE],
      }),
      [CardFormControls.SUBTYPE]: new FormControl<CardSubtype | null>(null),
      [CardFormControls.FRONT_IMAGE]: new FormControl<File | null>(null),
      [CardFormControls.BACK_IMAGE]: new FormControl<File | null>(null),
      [CardFormControls.ATTRIBUTE_MODIFIERS]: new FormControl<AttributeModifier[] | null>(null),
      [CardFormControls.HAND_USAGE]: new FormControl<number | null>(null, {
        validators: CARD_FORM_VALIDATORS[CardFormControls.HAND_USAGE],
      }),
    });
  }

  private initializeCardTranslationForm(): FormGroup<CardTranslationForm> {
    return new FormGroup<CardTranslationForm>({
      [CardTranslationFormControls.ID]: new FormControl<number | null>(null),
      [CardTranslationFormControls.NAME]: new FormControl<string | null>(null, {
        validators: CARD_TRANSLATION_FORM_VALIDATORS[CardTranslationFormControls.NAME],
      }),
      [CardTranslationFormControls.DESCRIPTION]: new FormControl<string | null>(null, {
        validators: CARD_TRANSLATION_FORM_VALIDATORS[CardTranslationFormControls.DESCRIPTION],
      }),
      [CardTranslationFormControls.LOCALE]: new FormControl<Language | null>(null),
    });
  }
}
