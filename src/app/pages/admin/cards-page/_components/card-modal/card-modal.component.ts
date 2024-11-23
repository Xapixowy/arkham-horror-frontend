import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, viewChild} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {CardsPageService} from '@Pages/admin/cards-page/cards-page.service';
import {Button} from 'primeng/button';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {CardFormControls} from '@Enums/form-controls/card-form-controls.enum';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormValidationMessageComponent} from '@Components/form-validation-message/form-validation-message.component';
import {Editor, EditorModule} from 'primeng/editor';
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
import {ModalMode} from '@Enums/modal-mode.enum';
import {FileHelper} from '@Helpers/file.helper';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {textInHtmlRequiredValidator} from '@Validators/text-in-html-required.validator';
import {TooltipModule} from 'primeng/tooltip';
import {TruncatePipe} from '@Pipes/truncate.pipe';
import {ImgPlaceholderComponent} from '@Components/img-placeholder/img-placeholder.component';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [
    DialogModule,
    Button,
    TranslocoPipe,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    EditorModule,
    DropdownModule,
    FileUploadModule,
    NgIcon,
    CascadeSelectModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    ButtonIconOnlyComponent,
    InputTextModule,
    NoContentComponent,
    NgOptimizedImage,
    TooltipModule,
    TruncatePipe,
    ImgPlaceholderComponent,
  ],
  providers: [provideIcons({tablerUpload, tablerX, tablerEdit, tablerCheck, tablerTrash})],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardModalComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly cardsPageService = inject(CardsPageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly NewCardFormControls = CardFormControls;
  protected readonly CARDS_PAGE_CONFIG = CARDS_PAGE_CONFIG;
  protected readonly getEnumValues = getEnumValues;
  protected readonly CardAttributeAbility = CardAttributeAbility;
  protected readonly CardAttributeRestriction = CardAttributeRestriction;
  protected readonly isCardModalShown = this.cardsPageService.isCardModalShown;
  protected readonly form = this.cardsPageService.cardForm;
  protected readonly types = this.cardsPageService.types;
  protected readonly subtypes = this.cardsPageService.subtypes;
  protected readonly selectedAttributeModifiers = this.cardsPageService.attributeModifiers;

  private frontImageFileUpload = viewChild<FileUpload>('frontImageFileUpload');
  private backImageFileUpload = viewChild<FileUpload>('backImageFileUpload');
  private descriptionEditor = viewChild<Editor>('descriptionEditor');

  protected readonly editableAttributeModifiers = signal<Record<string, AttributeModifier>>({});
  protected readonly frontImageSrc = signal<string | null>(null);
  protected readonly backImageSrc = signal<string | null>(null);

  protected readonly heading = computed<string>(() =>
    this.cardsPageService.cardModalMode() === ModalMode.CREATE ? '_CardsPage.Add card' : '_CardsPage.Edit card',
  );

  protected readonly attributeModifiersSelectOptions =
    CARDS_PAGE_CONFIG.attributeModifiersSelectOptions as unknown as string[];

  constructor() {
    this.subscribeToFormChanges();
  }

  get name(): AbstractControl {
    return this.form.get(CardFormControls.NAME) as AbstractControl;
  }

  get nameInputId(): string {
    return 'card-modal-' + CardFormControls.NAME;
  }

  get description(): AbstractControl {
    return this.form.get(CardFormControls.DESCRIPTION) as AbstractControl;
  }

  get descriptionInputId(): string {
    return 'card-modal-' + CardFormControls.DESCRIPTION;
  }

  get type(): AbstractControl {
    return this.form.get(CardFormControls.TYPE) as AbstractControl;
  }

  get typeInputId(): string {
    return 'card-modal-' + CardFormControls.TYPE;
  }

  get subtype(): AbstractControl {
    return this.form.get(CardFormControls.SUBTYPE) as AbstractControl;
  }

  get subtypeInputId(): string {
    return 'card-modal-' + CardFormControls.SUBTYPE;
  }

  get frontImage(): AbstractControl {
    return this.form.get(CardFormControls.FRONT_IMAGE) as AbstractControl;
  }

  get frontImageInputId(): string {
    return 'card-modal-' + CardFormControls.FRONT_IMAGE;
  }

  get backImage(): AbstractControl {
    return this.form.get(CardFormControls.BACK_IMAGE) as AbstractControl;
  }

  get backImageInputId(): string {
    return 'card-modal-' + CardFormControls.BACK_IMAGE;
  }

  get attributeModifiersInputId(): string {
    return 'card-modal-' + CardFormControls.ATTRIBUTE_MODIFIERS;
  }

  get handUsage(): AbstractControl {
    return this.form.get(CardFormControls.HAND_USAGE) as AbstractControl;
  }

  get handUsageInputId(): string {
    return 'card-modal-' + CardFormControls.HAND_USAGE;
  }

  onSave(): void {
    this.cardsPageService.submitCardForm().then((isSuccess) => isSuccess && this.cardsPageService.hideCardModal());
  }

  onCancel(): void {
    this.cardsPageService.resetCardForm();
    this.cardsPageService.hideCardModal();
    this.frontImageFileUpload()?.clear();
    this.backImageFileUpload()?.clear();
    this.descriptionEditor()!.quill.root.innerHTML = '';
  }

  onFrontImageSelect(event: FileSelectEvent): void {
    if (event.files.length > 0) {
      this.cardsPageService.setFrontImageFormValue(event.files[0]);
    }
  }

  onFrontImageRemove(fileUpload: FileUpload): void {
    fileUpload.clear();
    this.cardsPageService.setFrontImageFormValue(null);
  }

  onBackImageSelect(event: FileSelectEvent): void {
    if (event.files.length > 0) {
      this.cardsPageService.setBackImageFormValue(event.files[0]);
    }
  }

  onBackImageRemove(fileUpload: FileUpload): void {
    fileUpload.clear();
    this.cardsPageService.setBackImageFormValue(null);
  }

  onAttributeModifiersChange(event: CascadeSelectChangeEvent, component: CascadeSelect): void {
    const attributeModifiers = this.cardsPageService
      .attributeModifiers()
      .map((atributeModifier) => atributeModifier.modifier);
    if (event.value !== null && !attributeModifiers.includes(event.value.value)) {
      this.cardsPageService.attributeModifiers.update((modifiers) => [
        ...modifiers,
        {
          modifier: event.value.value,
          value: 0,
        },
      ]);
    }
    component.modelValue.set(null);
  }

  onRowEditInit(attributeModifier: AttributeModifier): void {
    this.editableAttributeModifiers.set({
      ...this.editableAttributeModifiers(),
      [attributeModifier.modifier]: {...attributeModifier},
    });
  }

  onRowEditSave(attributeModifier: AttributeModifier): void {
    const editableAttributeModifiers = this.editableAttributeModifiers();
    delete editableAttributeModifiers[attributeModifier.modifier];
    this.editableAttributeModifiers.set(editableAttributeModifiers);
  }

  onRowEditCancel(attributeModifier: AttributeModifier): void {
    const editableAttributeModifier = this.editableAttributeModifiers()[attributeModifier.modifier];
    this.cardsPageService.attributeModifiers.update((modifiers) => [
      ...modifiers.filter((modifier) => modifier.modifier !== editableAttributeModifier.modifier),
      {...editableAttributeModifier},
    ]);
    this.onRowEditSave(attributeModifier);
  }

  onRowRemove(attributeModifier: AttributeModifier): void {
    this.cardsPageService.attributeModifiers.update((modifiers) =>
      modifiers.filter((modifier) => modifier.modifier !== attributeModifier.modifier),
    );
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.frontImageSrc.set(
        value[CardFormControls.FRONT_IMAGE] ? FileHelper.convertFileToBlob(value[CardFormControls.FRONT_IMAGE]) : null,
      );
      this.backImageSrc.set(
        value[CardFormControls.BACK_IMAGE] ? FileHelper.convertFileToBlob(value[CardFormControls.BACK_IMAGE]) : null,
      );

      const isDescriptionValue =
        textInHtmlRequiredValidator()({
          value: this.descriptionEditor()!.quill.root.innerHTML,
        } as AbstractControl) === null;
      if (!isDescriptionValue) {
        this.descriptionEditor()!.quill.root.innerHTML = value[CardFormControls.DESCRIPTION];
      }
    });
  }
}
