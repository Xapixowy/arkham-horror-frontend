import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CardsPageService} from '@Pages/admin/cards-page/cards-page.service';
import {AsyncPipe} from '@angular/common';
import {TranslocoPipe} from '@jsverse/transloco';
import {CARDS_PAGE_CONFIG} from '@Pages/admin/cards-page/cards-page.config';
import {Button} from 'primeng/button';
import {ButtonIconOnlyComponent} from '@Components/button-icon-only/button-icon-only.component';
import {Card} from '@Models/card.model';
import {provideIcons} from '@ng-icons/core';
import {tablerEdit, tablerLanguage, tablerTrash} from '@ng-icons/tabler-icons';
import {CardModalComponent} from '@Pages/admin/cards-page/_components/card-modal/card-modal.component';
import {NoContentComponent} from '@Components/no-content/no-content.component';
import {Language} from '@Features/language/_enums/language.enum';
import {StateStatus} from '@Enums/state-status.enum';
import {
  CardTranslationModalComponent
} from '@Pages/admin/cards-page/_components/card-translation-modal/card-translation-modal.component';
import {
  CardTranslationsModalComponent
} from '@Pages/admin/cards-page/_components/card-translations-modal/card-translations-modal.component';
import {ImgPlaceholderComponent} from '@Components/img-placeholder/img-placeholder.component';
import {SortEvent} from 'primeng/api';
import {DateHumanReadableComponent} from '@Components/date-human-readable/date-human-readable.component';
import {TruncatePipe} from '@Pipes/truncate.pipe';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [
    TableModule,
    AsyncPipe,
    TranslocoPipe,
    Button,
    ButtonIconOnlyComponent,
    CardModalComponent,
    NoContentComponent,
    CardTranslationModalComponent,
    CardTranslationModalComponent,
    CardTranslationsModalComponent,
    ImgPlaceholderComponent,
    DateHumanReadableComponent,
    TruncatePipe,
    TooltipModule,
  ],
  providers: [CardsPageService, provideIcons({tablerEdit, tablerTrash, tablerLanguage})],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsPageComponent {
  private readonly cardsPageService = inject(CardsPageService);

  protected readonly CARDS_PAGE_CONFIG = CARDS_PAGE_CONFIG;
  protected readonly Language = Language;
  protected readonly cards = this.cardsPageService.cards;

  protected readonly isLoading = computed<boolean>(
    () =>
      this.cardsPageService.cardStatus() === StateStatus.LOADING &&
      this.cardsPageService.cardTranslationsCardId() === null,
  );

  async onCreate(): Promise<void> {
    await this.cardsPageService.showCardModal();
  }

  async onEdit(card: Card): Promise<void> {
    await this.cardsPageService.showCardModal(card);
  }

  onDelete(card: Card): void {
    this.cardsPageService.removeCard(card.id);
  }

  onCardTranslations(card: Card): void {
    this.cardsPageService.showCardTranslationsModal(card.id);
  }

  onSort(event: SortEvent): void {
    this.cardsPageService.sortCards(event);
  }
}
