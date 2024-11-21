import {Component, inject, signal} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {CardsPageService} from '@Pages/admin/cards-page/cards-page.service';
import {Button} from 'primeng/button';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {NewCardFormControls} from '@Enums/form-controls/new-card-form-controls.enum';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormValidationMessageComponent} from '@Components/form-validation-message/form-validation-message.component';
import {EditorModule} from 'primeng/editor';
import {DropdownModule} from 'primeng/dropdown';
import {FileSelectEvent, FileUpload, FileUploadModule} from 'primeng/fileupload';
import {CARDS_PAGE_CONFIG} from '@Pages/admin/cards-page/cards-page.config';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerCheck, tablerEdit, tablerTrash, tablerUpload, tablerX} from '@ng-icons/tabler-icons';
import {CascadeSelect, CascadeSelectChangeEvent, CascadeSelectModule} from 'primeng/cascadeselect';
import {TableModule} from 'primeng/table';
import {getEnumValues} from 'ts-enum-helpers';
import {CardAttributeAbility} from '@Enums/cards/card-attribute-ability.enum';
import {CardAttributeRestriction} from '@Enums/cards/card-attribute-restriction.enum';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonIconOnlyComponent} from '@Components/button-icon-only/button-icon-only.component';
import {AttributeModifier} from '@Types/cards/attribute-modifier.type';
import {InputTextModule} from 'primeng/inputtext';
import {NoContentComponent} from '@Components/no-content/no-content.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-new-card-modal',
  standalone: true,
  imports: [DialogModule, Button, TranslocoPipe, ReactiveFormsModule, FormValidationMessageComponent, EditorModule, DropdownModule, FileUploadModule, NgIcon, CascadeSelectModule, TableModule, InputNumberModule, FormsModule, ButtonIconOnlyComponent, InputTextModule, NoContentComponent, NgOptimizedImage],
  providers: [provideIcons({tablerUpload, tablerX, tablerEdit, tablerCheck, tablerTrash})],
  templateUrl: './new-card-modal.component.html',
  styleUrl: './new-card-modal.component.scss',
})
export class NewCardModalComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly cardsPageService = inject(CardsPageService);

  readonly isNewCardModalShown = this.cardsPageService.isNewCardModalShown;
  readonly form = this.cardsPageService.newCardForm;
  readonly types = this.cardsPageService.types;
  readonly subtypes = this.cardsPageService.subtypes;
  readonly selectedAttributeModifiers = this.cardsPageService.attributeModifiers;

  readonly editableAttributeModifiers = signal<Record<string, AttributeModifier>>({})
  readonly frontImageSrc = signal<string | null>(null)
  readonly backImageSrc = signal<string | null>(null)

  readonly attributeModifiersSelectOptions = CARDS_PAGE_CONFIG.attributeModifiersSelectOptions.map(group => ({
    label: this.translocoService.translate(group.label),
    options: group.options.map(option => ({
      ...option,
      name: this.translocoService.translate(option.name)
    }))
  })) as unknown as string[]

  get name(): AbstractControl {
    return this.form.get(NewCardFormControls.NAME) as AbstractControl;
  }

  get nameInputId(): string {
    return 'new-card-' + NewCardFormControls.NAME;
  }

  get description(): AbstractControl {
    return this.form.get(NewCardFormControls.DESCRIPTION) as AbstractControl;
  }

  get descriptionInputId(): string {
    return 'new-card-' + NewCardFormControls.DESCRIPTION;
  }

  get type(): AbstractControl {
    return this.form.get(NewCardFormControls.TYPE) as AbstractControl;
  }

  get typeInputId(): string {
    return 'new-card-' + NewCardFormControls.TYPE;
  }

  get subtype(): AbstractControl {
    return this.form.get(NewCardFormControls.SUBTYPE) as AbstractControl;
  }

  get subtypeInputId(): string {
    return 'new-card-' + NewCardFormControls.SUBTYPE;
  }

  get frontImage(): AbstractControl {
    return this.form.get(NewCardFormControls.FRONT_IMAGE) as AbstractControl;
  }

  get frontImageInputId(): string {
    return 'new-card-' + NewCardFormControls.FRONT_IMAGE;
  }

  get backImage(): AbstractControl {
    return this.form.get(NewCardFormControls.BACK_IMAGE) as AbstractControl;
  }

  get backImageInputId(): string {
    return 'new-card-' + NewCardFormControls.BACK_IMAGE;
  }

  get attributeModifiers(): AbstractControl {
    return this.form.get(NewCardFormControls.ATTRIBUTE_MODIFIERS) as AbstractControl;
  }

  get attributeModifiersInputId(): string {
    return 'new-card-' + NewCardFormControls.ATTRIBUTE_MODIFIERS;
  }

  get handUsage(): AbstractControl {
    return this.form.get(NewCardFormControls.HAND_USAGE) as AbstractControl;
  }

  get handUsageInputId(): string {
    return 'new-card-' + NewCardFormControls.HAND_USAGE;
  }

  onSave(): void {
    this.cardsPageService.submitNewCardForm()
      .then(isSuccess => isSuccess && this.cardsPageService.hideNewCardModal());
  }

  onCancel(): void {
    this.cardsPageService.resetNewCardForm();
    this.cardsPageService.hideNewCardModal();
  }

  onFrontImageSelect(event: FileSelectEvent): void {
    if (event.files.length > 0) {
      this.cardsPageService.setFrontImageFormValue(event.files[0]);
      this.frontImageSrc.set(this.convertFileToSrc(event.files[0]));
    }
  }

  onFrontImageRemove(fileUpload: FileUpload): void {
    fileUpload.clear();
    this.cardsPageService.setFrontImageFormValue(null);
    this.frontImageSrc.set(null);
  }

  onBackImageSelect(event: FileSelectEvent): void {
    if (event.files.length > 0) {
      this.cardsPageService.setBackImageFormValue(event.files[0]);
      this.backImageSrc.set(this.convertFileToSrc(event.files[0]));
    }
  }

  onBackImageRemove(fileUpload: FileUpload): void {
    fileUpload.clear();
    this.cardsPageService.setBackImageFormValue(null);
    this.backImageSrc.set(null);
  }

  onAttributeModifiersChange(event: CascadeSelectChangeEvent, component: CascadeSelect): void {
    const attributeModifiers = this.cardsPageService.attributeModifiers().map(atributeModifier => atributeModifier.modifier);
    if (event.value !== null && !attributeModifiers.includes(event.value.value)) {
      this.cardsPageService.attributeModifiers.update(modifiers => [...modifiers, {
        modifier: event.value.value,
        value: 0
      }]);
    }
    component.modelValue.set(null);
  }

  onRowEditInit(attributeModifier: AttributeModifier): void {
    this.editableAttributeModifiers.set({
      ...this.editableAttributeModifiers(),
      [attributeModifier.modifier]: {...attributeModifier}
    });
  }

  onRowEditSave(attributeModifier: AttributeModifier): void {
    const editableAttributeModifiers = this.editableAttributeModifiers();
    delete editableAttributeModifiers[attributeModifier.modifier];
    this.editableAttributeModifiers.set(editableAttributeModifiers);
  }

  onRowEditCancel(attributeModifier: AttributeModifier): void {
    const editableAttributeModifier = this.editableAttributeModifiers()[attributeModifier.modifier];
    this.cardsPageService.attributeModifiers.update(modifiers => ([
      ...modifiers.filter(modifier => modifier.modifier !== editableAttributeModifier.modifier),
      {...editableAttributeModifier}
    ]));
    this.onRowEditSave(attributeModifier);
  }

  onRowRemove(attributeModifier: AttributeModifier): void {
    this.cardsPageService.attributeModifiers.update(modifiers => modifiers.filter(modifier => modifier.modifier !== attributeModifier.modifier));
  }

  private convertFileToSrc(file: File): string {
    return URL.createObjectURL(file);
  }

  protected readonly NewCardFormControls = NewCardFormControls;
  protected readonly CARDS_PAGE_CONFIG = CARDS_PAGE_CONFIG;
  protected readonly getEnumValues = getEnumValues;
  protected readonly CardAttributeAbility = CardAttributeAbility;
  protected readonly CardAttributeRestriction = CardAttributeRestriction;
}
