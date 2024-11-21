import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCards } from '@State/cards/card.selectors';
import { Card } from '@Models/card.model';
import { cardInitialState } from '@State/cards/card.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addCard, loadCards, removeCard, updateCard } from '@State/cards/card.actions';
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

@Injectable({
  providedIn: 'root',
})
export class CardsPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly cards$ = this.store.select(selectCards);

  readonly cards = signal<Card[]>(cardInitialState.cards);

  readonly isCardModalShown = signal(false);
  readonly cardModalMode = signal<ModalMode>(ModalMode.CREATE);
  readonly types: CardType[] = getEnumValues(CardType);
  readonly subtypes: CardSubtype[] = getEnumValues(CardSubtype);
  readonly attributeModifiers = signal<AttributeModifier[]>([]);

  readonly cardForm = this.initializeCardForm();

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

  hideCardModal(): void {
    this.isCardModalShown.set(false);
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
            card: {
              name: this.cardForm.controls[CardFormControls.NAME].value as string,
              description: this.cardForm.controls[CardFormControls.DESCRIPTION].value as string,
              type: this.cardForm.controls[CardFormControls.TYPE].value as CardType,
              subtype: this.cardForm.controls[CardFormControls.SUBTYPE].value as CardSubtype,
              attribute_modifiers: this.attributeModifiers(),
              hand_usage: this.cardForm.controls[CardFormControls.HAND_USAGE].value as number,
            } as Card,
            frontImage: this.cardForm.controls[CardFormControls.FRONT_IMAGE].value as File,
            backImage: this.cardForm.controls[CardFormControls.BACK_IMAGE].value as File,
          }),
        );
      } else {
        this.store.dispatch(
          updateCard({
            card: {
              id: this.cardForm.controls[CardFormControls.ID].value as number,
              name: this.cardForm.controls[CardFormControls.NAME].value as string,
              description: this.cardForm.controls[CardFormControls.DESCRIPTION].value as string,
              type: this.cardForm.controls[CardFormControls.TYPE].value as CardType,
              subtype: this.cardForm.controls[CardFormControls.SUBTYPE].value as CardSubtype,
              attribute_modifiers: this.attributeModifiers(),
              hand_usage: this.cardForm.controls[CardFormControls.HAND_USAGE].value as number,
            } as Card,
            frontImage: this.cardForm.controls[CardFormControls.FRONT_IMAGE].value as File,
            backImage: this.cardForm.controls[CardFormControls.BACK_IMAGE].value as File,
          }),
        );
      }

      this.resetCardForm();
      resolve(true);
    });
  }

  resetCardForm(): void {
    this.cardForm.reset();
    this.attributeModifiers.set([]);
    this.cardForm.markAsPristine();
  }

  setFrontImageFormValue(photo: File | null): void {
    this.cardForm.controls[CardFormControls.FRONT_IMAGE].setValue(photo);
  }

  setBackImageFormValue(photo: File | null): void {
    this.cardForm.controls[CardFormControls.BACK_IMAGE].setValue(photo);
  }

  sortCards(event: SortEvent): void {
    this.cards.set(TableHelper.sort<Card>(event, this.cards()));
  }

  private subscribeForCardsChanges(): void {
    this.cards$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.cards.set(value));
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
}
