import {Component, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CardsPageService} from '@Pages/admin/cards-page/cards-page.service';
import {AsyncPipe} from '@angular/common';
import {TranslocoPipe} from '@jsverse/transloco';
import {CARDS_PAGE_CONFIG} from '@Pages/admin/cards-page/cards-page.config';
import {Button} from 'primeng/button';
import {ButtonIconOnlyComponent} from '@Components/button-icon-only/button-icon-only.component';
import {Card} from '@Models/card.model';
import {provideIcons} from '@ng-icons/core';
import {tablerEdit, tablerTrash} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [
    TableModule,
    AsyncPipe,
    TranslocoPipe,
    Button,
    ButtonIconOnlyComponent
  ],
  providers: [CardsPageService, provideIcons({tablerEdit, tablerTrash})],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.scss'
})
export class CardsPageComponent {
  private readonly cardsPageService = inject(CardsPageService);

  protected readonly CARDS_PAGE_CONFIG = CARDS_PAGE_CONFIG;

  readonly cards = this.cardsPageService.cards;

  onEdit(card: Card): void {
    console.log(card);
  }

  onDelete(card: Card): void {
    this.cardsPageService.removeCard(card.id);
  }
}
