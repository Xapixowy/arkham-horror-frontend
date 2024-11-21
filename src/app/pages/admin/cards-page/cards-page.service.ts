import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCards} from '@State/cards/card.selectors';
import {Card} from '@Models/card.model';
import {cardInitialState} from '@State/cards/card.reducer';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {addCard, loadCards, removeCard} from '@State/cards/card.actions';
import {ConfirmationService} from 'primeng/api';
import {FormControl, FormGroup} from '@angular/forms';
import {NewCardForm} from '@Types/forms/new-card-form.type';
import {NewCardFormControls} from '@Enums/form-controls/new-card-form-controls.enum';
import {CardType} from '@Enums/cards/card-type.enum';
import {CardSubtype} from '@Enums/cards/card-subtype.enum';
import {AttributeModifier} from '@Types/cards/attribute-modifier.type';
import {NEW_CARD_FORM_VALIDATORS} from '@Configs/form-validators/new-card-form-validators.config';
import {FormValidationService} from '@Services/form-validation.service';
import {getEnumValues} from 'ts-enum-helpers';

@Injectable({
  providedIn: 'root'
})
export class CardsPageService {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly cards$ = this.store.select(selectCards);

  readonly cards = signal<Card[]>(cardInitialState.cards)

  readonly isNewCardModalShown = signal(false)
  readonly types: CardType[] = getEnumValues(CardType)
  readonly subtypes: CardSubtype[] = getEnumValues(CardSubtype)
  readonly attributeModifiers = signal<AttributeModifier[]>([])

  readonly newCardForm = this.initializeNewCardForm();

  constructor() {
    this.subscribeForCardsChanges()
    this.store.dispatch(loadCards());
  }

  removeCard(id: number): void {
    this.confirmationService.confirm({
      key: 'danger',
      header: '_CardsPage.Delete card',
      message: '_CardsPage.Are you sure you want to delete this card?',
      accept: () => this.store.dispatch(removeCard({id}))
    });
  }

  showNewCardModal(): void {
    this.isNewCardModalShown.set(true);
  }

  hideNewCardModal(): void {
    this.isNewCardModalShown.set(false);
  }

  async submitNewCardForm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (FormValidationService.isFormInvalid(this.newCardForm)) {
        return resolve(false);
      }

      this.newCardForm.controls[NewCardFormControls.ATTRIBUTE_MODIFIERS].setValue(this.attributeModifiers());

      this.store.dispatch(addCard({
        card: {
          name: this.newCardForm.controls[NewCardFormControls.NAME].value as string,
          description: this.newCardForm.controls[NewCardFormControls.DESCRIPTION].value as string,
          type: this.newCardForm.controls[NewCardFormControls.TYPE].value as CardType,
          subtype: this.newCardForm.controls[NewCardFormControls.SUBTYPE].value as CardSubtype,
          attributeModifiers: this.attributeModifiers(),
          handUsage: this.newCardForm.controls[NewCardFormControls.HAND_USAGE].value as number,
        } as Card,
        frontImage: this.newCardForm.controls[NewCardFormControls.FRONT_IMAGE].value as File,
        backImage: this.newCardForm.controls[NewCardFormControls.BACK_IMAGE].value as File,
      }));

      this.resetNewCardForm();
      resolve(true);
    });
  }

  resetNewCardForm(): void {
    this.newCardForm.reset();
    this.attributeModifiers.set([]);
    this.newCardForm.markAsPristine();
  }

  setFrontImageFormValue(photo: File | null): void {
    this.newCardForm.controls[NewCardFormControls.FRONT_IMAGE].setValue(photo);
  }

  setBackImageFormValue(photo: File | null): void {
    this.newCardForm.controls[NewCardFormControls.BACK_IMAGE].setValue(photo);
  }

  private subscribeForCardsChanges(): void {
    this.cards$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => this.cards.set(value));
  }

  private initializeNewCardForm(): FormGroup<NewCardForm> {
    return new FormGroup<NewCardForm>({
      [NewCardFormControls.NAME]: new FormControl<string | null>(null, {
        validators: NEW_CARD_FORM_VALIDATORS[NewCardFormControls.NAME],
      }),
      [NewCardFormControls.DESCRIPTION]: new FormControl<string | null>(null, {
        validators: NEW_CARD_FORM_VALIDATORS[NewCardFormControls.DESCRIPTION],
      }),
      [NewCardFormControls.TYPE]: new FormControl<CardType | null>(null, {
        validators: NEW_CARD_FORM_VALIDATORS[NewCardFormControls.TYPE],
      }),
      [NewCardFormControls.SUBTYPE]: new FormControl<CardSubtype | null>(null),
      [NewCardFormControls.FRONT_IMAGE]: new FormControl<File | null>(null, {
        validators: NEW_CARD_FORM_VALIDATORS[NewCardFormControls.FRONT_IMAGE],
      }),
      [NewCardFormControls.BACK_IMAGE]: new FormControl<File | null>(null, {
        validators: NEW_CARD_FORM_VALIDATORS[NewCardFormControls.BACK_IMAGE],
      }),
      [NewCardFormControls.ATTRIBUTE_MODIFIERS]: new FormControl<AttributeModifier[] | null>(null),
      [NewCardFormControls.HAND_USAGE]: new FormControl<number | null>(null, {
        validators: NEW_CARD_FORM_VALIDATORS[NewCardFormControls.HAND_USAGE],
      }),
    });
  }
}
