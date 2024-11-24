import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, viewChild} from '@angular/core';
import {CardsPageService} from '@Pages/admin/cards-page/cards-page.service';
import {TranslocoPipe} from '@jsverse/transloco';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {ModalMode} from '@Enums/modal-mode.enum';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {textInHtmlRequiredValidator} from '@Validators/text-in-html-required.validator';
import {CardTranslationFormControls} from '@Enums/form-controls/card-translation-form-controls.enum';
import {Editor, EditorModule} from 'primeng/editor';
import {DialogModule} from 'primeng/dialog';
import {FormValidationMessageComponent} from '@Components/form-validation-message/form-validation-message.component';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {Language} from '@Features/language/_enums/language.enum';
import {APP_CONFIG} from '@Configs/app.config';

@Component({
  selector: 'app-card-translation-modal',
  standalone: true,
  imports: [
    DialogModule,
    FormValidationMessageComponent,
    EditorModule,
    Button,
    ReactiveFormsModule,
    InputTextModule,
    TranslocoPipe,
  ],
  templateUrl: './card-translation-modal.component.html',
  styleUrl: './card-translation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTranslationModalComponent {
  private readonly cardsPageService = inject(CardsPageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.cardsPageService.cardTranslationForm;
  protected readonly isCardTranslationModalShown = this.cardsPageService.isCardTranslationModalShown;
  protected readonly CardTranslationFormControls = CardTranslationFormControls;
  protected readonly Language = Language;

  private readonly descriptionEditor = viewChild<Editor>('descriptionEditor');

  protected readonly language = signal<Language>(APP_CONFIG.defaultLanguage);

  protected readonly heading = computed<string>(() =>
    this.cardsPageService.cardTranslationModalMode() === ModalMode.CREATE
      ? '_CardsPage.Add card translation'
      : '_CardsPage.Edit card translation',
  );

  constructor() {
    this.subscribeToFormChanges();
  }

  get name(): AbstractControl {
    return this.form.get(CardTranslationFormControls.NAME) as AbstractControl;
  }

  get nameInputId(): string {
    return 'card-translation-modal-' + CardTranslationFormControls.NAME;
  }

  get description(): AbstractControl {
    return this.form.get(CardTranslationFormControls.DESCRIPTION) as AbstractControl;
  }

  get descriptionInputId(): string {
    return 'card-translation-modal-' + CardTranslationFormControls.DESCRIPTION;
  }

  onSave(): void {
    this.cardsPageService.submitCardTranslationForm().then((isSuccess) => isSuccess && this.onCancel());
  }

  onCancel(): void {
    this.cardsPageService.hideCardTranslationModal();
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.language.set(value[CardTranslationFormControls.LOCALE]!);

      const isDescriptionValue =
        textInHtmlRequiredValidator()({
          value: this.descriptionEditor()!.quill.root.innerHTML,
        } as AbstractControl) === null;
      if (!isDescriptionValue) {
        this.descriptionEditor()!.quill.root.innerHTML = value[CardTranslationFormControls.DESCRIPTION];
      }
    });
  }
}
