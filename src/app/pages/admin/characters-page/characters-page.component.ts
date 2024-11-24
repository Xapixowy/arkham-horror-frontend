import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { PrimeTemplate, SortEvent } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TranslocoPipe } from '@jsverse/transloco';
import { CharactersPageService } from '@Pages/admin/characters-page/characters-page.service';
import { StateStatus } from '@Enums/state-status.enum';
import { CHARACTERS_PAGE_CONFIG } from '@Pages/admin/characters-page/characters-page.config';
import { Character } from '@Models/character.model';
import { Language } from '@Features/language/_enums/language.enum';
import { provideIcons } from '@ng-icons/core';
import { tablerEdit, tablerLanguage, tablerTrash } from '@ng-icons/tabler-icons';
import { DateHumanReadableComponent } from '@Components/date-human-readable/date-human-readable.component';
import { CharacterModalComponent } from '@Pages/admin/characters-page/_components/character-modal/character-modal.component';

@Component({
  selector: 'app-characters-page',
  standalone: true,
  imports: [
    Button,
    ButtonIconOnlyComponent,
    ImgPlaceholderComponent,
    NoContentComponent,
    PrimeTemplate,
    TableModule,
    TranslocoPipe,
    DateHumanReadableComponent,
    CharacterModalComponent,
  ],
  providers: [CharactersPageService, provideIcons({ tablerEdit, tablerTrash, tablerLanguage })],
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersPageComponent {
  private readonly charactersPageService = inject(CharactersPageService);

  protected readonly CHARACTERS_PAGE_CONFIG = CHARACTERS_PAGE_CONFIG;
  protected readonly Language = Language;
  protected readonly characters = this.charactersPageService.characters;

  protected readonly isLoading = computed<boolean>(
    () =>
      this.charactersPageService.characterStatus() === StateStatus.LOADING &&
      this.charactersPageService.characters.length === 0,
  );

  onCreate(): void {
    this.charactersPageService.showCharacterModal();
  }

  onCharacterTranslations(character: Character): void {
    console.log('onCharacterTranslations', character);
  }

  onEdit(character: Character): void {
    this.charactersPageService.showCharacterModal(character);
  }

  onDelete(character: Character): void {
    this.charactersPageService.removeCharacter(character.id);
  }

  onSort(event: SortEvent): void {
    this.charactersPageService.sortCharacters(event);
  }
}
