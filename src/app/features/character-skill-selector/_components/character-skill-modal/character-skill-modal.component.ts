import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormValidationMessageComponent } from '@Components/form-validation-message/form-validation-message.component';
import { Button } from 'primeng/button';
import { Editor, EditorModule } from 'primeng/editor';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { CharacterSkillFormControls } from '@Enums/form-controls/character-skill-form-controls.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { textInHtmlRequiredValidator } from '@Validators/text-in-html-required.validator';
import { CardFormControls } from '@Enums/form-controls/card-form-controls.enum';
import { ModalMode } from '@Enums/modal-mode.enum';
import { CharacterSkillSelectorService } from '@Features/character-skill-selector/_services/character-skill-selector.service';
import { Skill } from '@Types/characters/skill.type';

@Component({
  selector: 'app-character-skill-modal',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    Button,
    EditorModule,
    TranslocoPipe,
    InputTextModule,
  ],
  templateUrl: './character-skill-modal.component.html',
  styleUrl: './character-skill-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSkillModalComponent {
  private readonly characterSkillSelectorService = inject(CharacterSkillSelectorService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.characterSkillSelectorService.characterSkillForm;
  protected readonly CharacterSkillFormControls = CharacterSkillFormControls;

  private readonly descriptionEditor = viewChild<Editor>('descriptionEditor');

  readonly isModalShown = input.required<WritableSignal<boolean>>();
  readonly skills = input.required<WritableSignal<Skill[]>>();

  protected readonly heading = computed<string>(() =>
    this.characterSkillSelectorService.characterSkillModalMode() === ModalMode.CREATE
      ? '_CharactersPage.Add character skill'
      : '_CharactersPage.Edit character skill',
  );

  constructor() {
    this.subscribeToFormChanges();
  }

  get name(): AbstractControl {
    return this.form.get(CharacterSkillFormControls.NAME) as AbstractControl;
  }

  get nameInputId(): string {
    return 'character-skill-modal-' + CharacterSkillFormControls.NAME;
  }

  get description(): AbstractControl {
    return this.form.get(CharacterSkillFormControls.DESCRIPTION) as AbstractControl;
  }

  get descriptionInputId(): string {
    return 'character-skill-modal-' + CharacterSkillFormControls.DESCRIPTION;
  }

  onSave(): void {
    this.characterSkillSelectorService
      .submitCharacterSkillForm(this.skills())
      .then(
        (isSuccess) => isSuccess && this.characterSkillSelectorService.hideCharacterSkillModal(this.isModalShown()),
      );
  }

  onCancel(): void {
    this.characterSkillSelectorService.hideCharacterSkillModal(this.isModalShown());
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
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
