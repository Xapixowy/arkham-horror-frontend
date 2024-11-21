import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardsPageService } from '@Pages/admin/cards-page/cards-page.service';
import { AsyncPipe } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { CARDS_PAGE_CONFIG } from '@Pages/admin/cards-page/cards-page.config';
import { Button } from 'primeng/button';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { Card } from '@Models/card.model';
import { provideIcons } from '@ng-icons/core';
import { tablerEdit, tablerLanguage, tablerTrash } from '@ng-icons/tabler-icons';
import { CardModalComponent } from '@Pages/admin/cards-page/_components/card-modal/card-modal.component';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { SortEvent } from 'primeng/api';

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
  ],
  providers: [CardsPageService, provideIcons({ tablerEdit, tablerTrash, tablerLanguage })],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsPageComponent {
  private readonly cardsPageService = inject(CardsPageService);

  protected readonly CARDS_PAGE_CONFIG = CARDS_PAGE_CONFIG;

  readonly cards = this.cardsPageService.cards;

  onCreate(): void {
    this.cardsPageService.showCardModal();
  }

  onEdit(card: Card): void {
    this.cardsPageService.showCardModal(card);
  }

  onDelete(card: Card): void {
    this.cardsPageService.removeCard(card.id);
  }

  customSort(event: SortEvent): void {
    this.cardsPageService.sortCards(event);
  }
}
