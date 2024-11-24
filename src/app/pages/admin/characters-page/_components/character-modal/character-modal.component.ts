import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TranslocoPipe } from '@jsverse/transloco';
import { CharactersPageService } from '@Pages/admin/characters-page/characters-page.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterFormControls } from '@Enums/form-controls/character-form-controls.enum';
import { InputTextModule } from 'primeng/inputtext';
import { FormValidationMessageComponent } from '@Components/form-validation-message/form-validation-message.component';
import { Editor, EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CHARACTERS_PAGE_CONFIG } from '@Pages/admin/characters-page/characters-page.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileHelper } from '@Helpers/file.helper';
import { textInHtmlRequiredValidator } from '@Validators/text-in-html-required.validator';
import { CardFormControls } from '@Enums/form-controls/card-form-controls.enum';
import { PaginatorModule } from 'primeng/paginator';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { TableModule } from 'primeng/table';
import { HtmlToTextPipe } from '@Pipes/html-to-text.pipe';
import { TruncatePipe } from '@Pipes/truncate.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { tablerPlus } from '@ng-icons/tabler-icons';
import { InputOtpModule } from 'primeng/inputotp';
import { CardSelectorComponent } from '@Components/card-selector/card-selector.component';
import { CharacterSkillSelectorComponent } from '@Features/character-skill-selector/_components/character-skill-selector/character-skill-selector.component';

@Component({
  selector: 'app-character-modal',
  standalone: true,
  imports: [
    DialogModule,
    TranslocoPipe,
    ReactiveFormsModule,
    InputTextModule,
    FormValidationMessageComponent,
    EditorModule,
    DropdownModule,
    ButtonIconOnlyComponent,
    FileUploadModule,
    ImgPlaceholderComponent,
    NgIcon,
    PaginatorModule,
    NoContentComponent,
    TableModule,
    HtmlToTextPipe,
    TruncatePipe,
    TooltipModule,
    InputOtpModule,
    CardSelectorComponent,
    CharacterSkillSelectorComponent,
  ],
  providers: [provideIcons({ tablerPlus })],
  templateUrl: './character-modal.component.html',
  styleUrl: './character-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterModalComponent {
  private readonly charactersPageService = inject(CharactersPageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly CharacterFormControls = CharacterFormControls;
  protected readonly CHARACTERS_PAGE_CONFIG = CHARACTERS_PAGE_CONFIG;
  protected readonly isCharacterModalShown = this.charactersPageService.isCharacterModalShown;
  protected readonly isCharacterSkillModalShown = this.charactersPageService.isCharacterSkillModalShown;
  protected readonly form = this.charactersPageService.characterForm;
  protected readonly expansions = this.charactersPageService.expansions;
  protected readonly skills = this.charactersPageService.skills;
  protected readonly selectedCharacterCards = this.charactersPageService.selectedCharacterCards;

  private readonly descriptionEditor = viewChild<Editor>('descriptionEditor');

  protected readonly imageSrc = signal<string | null>(null);

  protected readonly heading = computed<string>(() =>
    this.charactersPageService.characterModalMode() === 'create'
      ? '_CharactersPage.Add character'
      : '_CharactersPage.Edit character',
  );

  constructor() {
    this.subscribeToFormChanges();
  }

  get expansion(): AbstractControl {
    return this.form.get(CharacterFormControls.EXPANSION) as AbstractControl;
  }

  get expansionInputId(): string {
    return 'character-modal-' + CharacterFormControls.EXPANSION;
  }

  get name(): AbstractControl {
    return this.form.get(CharacterFormControls.NAME) as AbstractControl;
  }

  get nameInputId(): string {
    return 'character-modal-' + CharacterFormControls.NAME;
  }

  get description(): AbstractControl {
    return this.form.get(CharacterFormControls.DESCRIPTION) as AbstractControl;
  }

  get descriptionInputId(): string {
    return 'character-modal-' + CharacterFormControls.DESCRIPTION;
  }

  get image(): AbstractControl {
    return this.form.get(CharacterFormControls.IMAGE) as AbstractControl;
  }

  get imageInputId(): string {
    return 'character-modal-' + CharacterFormControls.IMAGE;
  }

  get profession(): AbstractControl {
    return this.form.get(CharacterFormControls.PROFESSION) as AbstractControl;
  }

  get professionInputId(): string {
    return 'character-modal-' + CharacterFormControls.PROFESSION;
  }

  get startingLocation(): AbstractControl {
    return this.form.get(CharacterFormControls.STARTING_LOCATION) as AbstractControl;
  }

  get startingLocationInputId(): string {
    return 'character-modal-' + CharacterFormControls.STARTING_LOCATION;
  }

  get sanity(): AbstractControl {
    return this.form.get(CharacterFormControls.SANITY) as AbstractControl;
  }

  get sanityInputId(): string {
    return 'character-modal-' + CharacterFormControls.SANITY;
  }

  get endurance(): AbstractControl {
    return this.form.get(CharacterFormControls.ENDURANCE) as AbstractControl;
  }

  get enduranceInputId(): string {
    return 'character-modal-' + CharacterFormControls.ENDURANCE;
  }

  get concentration(): AbstractControl {
    return this.form.get(CharacterFormControls.CONCENTRATION) as AbstractControl;
  }

  get concentrationInputId(): string {
    return 'character-modal-' + CharacterFormControls.CONCENTRATION;
  }

  get characterSkills(): AbstractControl {
    return this.form.get(CharacterFormControls.SKILLS) as AbstractControl;
  }

  get attributesSpeed(): AbstractControl {
    return this.form.get(CharacterFormControls.ATTRIBUTES_SPEED) as AbstractControl;
  }

  get attributesSpeedInputId(): string {
    return 'character-modal-' + CharacterFormControls.ATTRIBUTES_SPEED;
  }

  get attributesSneak(): AbstractControl {
    return this.form.get(CharacterFormControls.ATTRIBUTES_SNEAK) as AbstractControl;
  }

  get attributesSneakInputId(): string {
    return 'character-modal-' + CharacterFormControls.ATTRIBUTES_SNEAK;
  }

  get attributesProwess(): AbstractControl {
    return this.form.get(CharacterFormControls.ATTRIBUTES_PROWESS) as AbstractControl;
  }

  get attributesProwessInputId(): string {
    return 'character-modal-' + CharacterFormControls.ATTRIBUTES_PROWESS;
  }

  get attributesWill(): AbstractControl {
    return this.form.get(CharacterFormControls.ATTRIBUTES_WILL) as AbstractControl;
  }

  get attributesWillInputId(): string {
    return 'character-modal-' + CharacterFormControls.ATTRIBUTES_WILL;
  }

  get attributesKnowledge(): AbstractControl {
    return this.form.get(CharacterFormControls.ATTRIBUTES_KNOWLEDGE) as AbstractControl;
  }

  get attributesKnowledgeInputId(): string {
    return 'character-modal-' + CharacterFormControls.ATTRIBUTES_KNOWLEDGE;
  }

  get attributesLuck(): AbstractControl {
    return this.form.get(CharacterFormControls.ATTRIBUTES_LUCK) as AbstractControl;
  }

  get attributesLuckInputId(): string {
    return 'character-modal-' + CharacterFormControls.ATTRIBUTES_LUCK;
  }

  get equipmentMoney(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_MONEY) as AbstractControl;
  }

  get equipmentMoneyInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_MONEY;
  }

  get equipmentClues(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_CLUES) as AbstractControl;
  }

  get equipmentCluesInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_CLUES;
  }

  get equipmentRandomCommonItems(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS) as AbstractControl;
  }

  get equipmentRandomCommonItemsInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_RANDOM_COMMON_ITEMS;
  }

  get equipmentRandomUniqueItems(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS) as AbstractControl;
  }

  get equipmentRandomUniqueItemsInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_RANDOM_UNIQUE_ITEMS;
  }

  get equipmentRandomSpells(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_RANDOM_SPELLS) as AbstractControl;
  }

  get equipmentRandomSpellsInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_RANDOM_SPELLS;
  }

  get equipmentRandomAbilities(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES) as AbstractControl;
  }

  get equipmentRandomAbilitiesInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_RANDOM_ABILITIES;
  }

  get equipmentRandomAllies(): AbstractControl {
    return this.form.get(CharacterFormControls.EQUIPMENT_RANDOM_ALLIES) as AbstractControl;
  }

  get equipmentRandomAlliesInputId(): string {
    return 'character-modal-' + CharacterFormControls.EQUIPMENT_RANDOM_ALLIES;
  }

  onSave(): void {
    this.charactersPageService
      .submitCharacterForm()
      .then((isSuccess) => isSuccess && this.charactersPageService.hideCharacterModal());
  }

  onCancel(): void {
    this.charactersPageService.hideCharacterModal();
    this.descriptionEditor()!.quill.root.innerHTML = '';
  }

  onImageSelect(event: FileSelectEvent): void {
    if (event.files.length > 0) {
      this.charactersPageService.setCharacterImageFormValue(event.files[0]);
    }
  }

  onImageRemove(fileUpload: FileUpload): void {
    fileUpload.clear();
    this.charactersPageService.setCharacterImageFormValue(null);
  }

  onSkillAdd(): void {
    this.charactersPageService.showCharacterSkillModal();
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.imageSrc.set(
        value[CharacterFormControls.IMAGE] ? FileHelper.convertFileToBlob(value[CharacterFormControls.IMAGE]) : null,
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
