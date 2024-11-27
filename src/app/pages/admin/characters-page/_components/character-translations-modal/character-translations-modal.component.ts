import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {EditorModule} from 'primeng/editor';
import {FormValidationMessageComponent} from '@Components/form-validation-message/form-validation-message.component';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {PrimeTemplate} from 'primeng/api';
import {TranslocoPipe} from '@jsverse/transloco';
import {ButtonIconOnlyComponent} from '@Components/button-icon-only/button-icon-only.component';
import {NoContentComponent} from '@Components/no-content/no-content.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TableModule} from 'primeng/table';
import {CharactersPageService} from '@Pages/admin/characters-page/characters-page.service';
import {StateStatus} from '@Enums/state-status.enum';
import {Language} from '@Features/language/_enums/language.enum';
import {APP_CONFIG} from '@Configs/app.config';
import {CharacterTranslation} from '@Models/character-translation.model';
import {DateHumanReadableComponent} from '@Components/date-human-readable/date-human-readable.component';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-character-translations-modal',
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
    ButtonIconOnlyComponent,
    NoContentComponent,
    OverlayPanelModule,
    TableModule,
    DateHumanReadableComponent,
    TooltipModule,
  ],
  templateUrl: './character-translations-modal.component.html',
  styleUrl: './character-translations-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterTranslationsModalComponent {
  private readonly charactersPageService = inject(CharactersPageService);

  protected readonly isCharacterTranslationsModalShown = this.charactersPageService.isCharacterTranslationsModalShown;
  protected readonly characterTranslations = this.charactersPageService.characterTranslations;
  protected readonly characterTranslationsCharacterId = this.charactersPageService.characterTranslationsCharacterId;
  protected readonly Language = Language;

  protected readonly isLoading = computed<boolean>(
    () =>
      this.charactersPageService.characterStatus() === StateStatus.LOADING &&
      this.characterTranslationsCharacterId() !== null,
  );

  protected readonly availableLanguages = computed<Language[]>(() => {
    const cardTranslationLanguages = this.characterTranslations().map((t) => t.locale);
    const appLanguage = APP_CONFIG.defaultLanguage;
    return APP_CONFIG.availableLanguages.filter((l) => !cardTranslationLanguages.includes(l) && l !== appLanguage);
  });

  onAddCharacterTranslation(language: Language): void {
    this.charactersPageService.showCharacterTranslationModal(language);
  }

  onEditInit(characterTranslation: CharacterTranslation): void {
    this.charactersPageService.showCharacterTranslationModal(characterTranslation.locale, characterTranslation);
  }

  onDelete(characterTranslation: CharacterTranslation): void {
    this.charactersPageService.removeCharacterTranslation(
      this.characterTranslationsCharacterId()!,
      characterTranslation.locale,
    );
  }

  onHide(): void {
    this.charactersPageService.hideCharacterTranslationsModal();
  }
}
