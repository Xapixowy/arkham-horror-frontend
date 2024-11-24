import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Editor, EditorModule } from 'primeng/editor';
import { FormValidationMessageComponent } from '@Components/form-validation-message/form-validation-message.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate } from 'primeng/api';
import { TranslocoPipe } from '@jsverse/transloco';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { CharacterSkillSelectorComponent } from '@Features/character-skill-selector/_components/character-skill-selector/character-skill-selector.component';
import { CharactersPageService } from '@Pages/admin/characters-page/characters-page.service';
import { Language } from '@Features/language/_enums/language.enum';
import { APP_CONFIG } from '@Configs/app.config';
import { ModalMode } from '@Enums/modal-mode.enum';
import { CharacterTranslationFormControls } from '@Enums/form-controls/character-translation-form-controls.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { textInHtmlRequiredValidator } from '@Validators/text-in-html-required.validator';
import { provideIcons } from '@ng-icons/core';
import { tablerPlus } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-character-translation-modal',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    EditorModule,
    FormValidationMessageComponent,
    InputTextModule,
    PaginatorModule,
    PrimeTemplate,
    TranslocoPipe,
    ReactiveFormsModule,
    ButtonIconOnlyComponent,
    CharacterSkillSelectorComponent,
  ],
  providers: [provideIcons({ tablerPlus })],
  templateUrl: './character-translation-modal.component.html',
  styleUrl: './character-translation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterTranslationModalComponent {
  private readonly charactersPageSerivce = inject(CharactersPageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.charactersPageSerivce.characterTranslationForm;
  protected readonly isCharacterTranslationModalShown = this.charactersPageSerivce.isCharacterTranslationModalShown;
  protected readonly isCharacterSkillModalShown = this.charactersPageSerivce.isCharacterTranslationSkillModalShown;
  protected readonly skills = this.charactersPageSerivce.characterTranslationModalSkills;
  protected readonly CharacterTranslationFormControls = CharacterTranslationFormControls;
  protected readonly Language = Language;

  private readonly descriptionEditor = viewChild<Editor>('descriptionEditor');

  protected readonly language = signal<Language>(APP_CONFIG.defaultLanguage);

  protected readonly heading = computed<string>(() =>
    this.charactersPageSerivce.characterTranslationModalMode() === ModalMode.CREATE
      ? '_CharactersPage.Add character translation'
      : '_CharactersPage.Edit character translation',
  );

  constructor() {
    this.subscribeToFormChanges();
  }

  get name(): AbstractControl {
    return this.form.get(CharacterTranslationFormControls.NAME) as AbstractControl;
  }

  get nameInputId(): string {
    return 'character-translation-modal-' + CharacterTranslationFormControls.NAME;
  }

  get description(): AbstractControl {
    return this.form.get(CharacterTranslationFormControls.DESCRIPTION) as AbstractControl;
  }

  get descriptionInputId(): string {
    return 'character-translation-modal-' + CharacterTranslationFormControls.DESCRIPTION;
  }

  get profession(): AbstractControl {
    return this.form.get(CharacterTranslationFormControls.PROFESSION) as AbstractControl;
  }

  get professionInputId(): string {
    return 'character-translation-modal-' + CharacterTranslationFormControls.PROFESSION;
  }

  get startingLocation(): AbstractControl {
    return this.form.get(CharacterTranslationFormControls.STARTING_LOCATION) as AbstractControl;
  }

  get startingLocationInputId(): string {
    return 'character-translation-modal-' + CharacterTranslationFormControls.STARTING_LOCATION;
  }

  get characterSkills(): AbstractControl {
    return this.form.get(CharacterTranslationFormControls.SKILLS) as AbstractControl;
  }

  onSave(): void {
    this.charactersPageSerivce.submitCharacterTranslationForm().then((isSuccess) => isSuccess && this.onCancel());
  }

  onCancel(): void {
    this.charactersPageSerivce.hideCharacterTranslationModal();
  }

  onSkillAdd(): void {
    this.charactersPageSerivce.showCharacterTranslationSkillModal();
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.language.set(value[CharacterTranslationFormControls.LOCALE]!);

      const isDescriptionValue =
        textInHtmlRequiredValidator()({
          value: this.descriptionEditor()!.quill.root.innerHTML,
        } as AbstractControl) === null;
      if (!isDescriptionValue) {
        this.descriptionEditor()!.quill.root.innerHTML = value[CharacterTranslationFormControls.DESCRIPTION];
      }
    });
  }
}
