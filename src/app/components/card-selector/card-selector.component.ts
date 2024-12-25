import { ChangeDetectionStrategy, Component, inject, input, output, signal, WritableSignal } from '@angular/core';
import { CharacterCard } from '@Models/character-card.model';
import { CardSelectorService } from '@Components/card-selector/card-selector.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { Card } from '@Models/card.model';
import { Button } from 'primeng/button';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerAdjustments,
  tablerCards,
  tablerInfoCircle,
  tablerLibraryPhoto,
  tablerMinus,
  tablerPlus,
  tablerScript,
} from '@ng-icons/tabler-icons';
import { TruncatePipe } from '@Pipes/truncate.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { PlayerCard } from '@Models/player-card.model';
import { CardSelectorMode } from '@Components/card-selector/_types/card-selector-mode.type';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { getEnumValues } from 'ts-enum-helpers';
import { CardAttributeAbility } from '@Enums/cards/card-attribute-ability.enum';
import { CardAttributeRestriction } from '@Enums/cards/card-attribute-restriction.enum';

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [
    AsyncPipe,
    DropdownModule,
    TranslocoPipe,
    ImgPlaceholderComponent,
    Button,
    ButtonIconOnlyComponent,
    TruncatePipe,
    TooltipModule,
    TableModule,
    NoContentComponent,
    NgIcon,
    NgTemplateOutlet,
    CardModule,
    DialogModule,
  ],
  providers: [
    CardSelectorService,
    provideIcons({
      tablerMinus,
      tablerPlus,
      tablerCards,
      tablerLibraryPhoto,
      tablerInfoCircle,
      tablerAdjustments,
      tablerScript,
    }),
  ],
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSelectorComponent {
  private readonly cardSelectorService = inject(CardSelectorService);

  readonly cards = this.cardSelectorService.cards;

  readonly selectedCards = input.required<WritableSignal<CharacterCard[] | PlayerCard[]>>();
  readonly mode = input.required<CardSelectorMode>();

  readonly onSelectedCardsChange = output<CharacterCard[] | PlayerCard[]>();

  protected readonly isCardDetailsModalShown = signal<boolean>(false);
  protected readonly cardDetailsModalCard = signal<CharacterCard | PlayerCard | null>(null);
  private readonly isCardBeingSelected = signal<boolean>(false);

  protected showCardDetailsModal(card: CharacterCard | PlayerCard): void {
    this.cardDetailsModalCard.set(card);
    this.isCardDetailsModalShown.set(true);
  }

  protected hideCardDetailsModal(): void {
    this.isCardDetailsModalShown.set(false);
    this.cardDetailsModalCard.set(null);
  }

  protected isCardAttributeAbility(value: string): boolean {
    return getEnumValues(CardAttributeAbility).includes(value);
  }

  protected isCardAttributeRestriction(value: string): boolean {
    return getEnumValues(CardAttributeRestriction).includes(value);
  }

  protected onCardSelection(event: DropdownChangeEvent, component: Dropdown): void {
    if (this.isCardBeingSelected()) {
      return;
    }

    const selectedCard = event.value as Card;

    this.isCardBeingSelected.set(true);
    this.selectedCards().update((selectedCards) => {
      const updatedSelectedCards = [...selectedCards];
      const selectedCardIndex = updatedSelectedCards.findIndex(
        (updatedSelectedCard) => updatedSelectedCard.card!.id === selectedCard.id,
      );

      if (selectedCardIndex >= 0) {
        updatedSelectedCards[selectedCardIndex].quantity += 1;
      } else {
        updatedSelectedCards.push(
          CardSelectorService.generateSelectedCardObject(this.mode(), Date.now(), 1, selectedCard),
        );
      }
      return updatedSelectedCards;
    });

    this.onSelectedCardsChange.emit(this.selectedCards()());

    component.clear();
    setTimeout(() => this.isCardBeingSelected.set(false), 0);
  }

  protected onCardQuantityChange(selectedCard: CharacterCard | PlayerCard, modifier: number): void {
    this.selectedCards().update((selectedCards) => {
      const updatedSelectedCards = [...selectedCards];
      const selectedCardIndex = updatedSelectedCards.findIndex((cc) => cc.id === selectedCard.id);

      const selectedCardExists = selectedCardIndex >= 0;
      const isPossibleToIncreaseQuantity =
        selectedCardExists && modifier > 0 && updatedSelectedCards[selectedCardIndex].quantity <= 8;
      const isPossibleToDecreaseQuantity =
        selectedCardExists && modifier < 0 && updatedSelectedCards[selectedCardIndex].quantity >= 2;
      const isPossibleToDeleteCard =
        selectedCardExists && modifier < 0 && updatedSelectedCards[selectedCardIndex].quantity === 1;

      if (isPossibleToIncreaseQuantity || isPossibleToDecreaseQuantity) {
        updatedSelectedCards[selectedCardIndex] = CardSelectorService.generateSelectedCardObject(
          this.mode(),
          selectedCard.id,
          selectedCard.quantity + modifier,
          selectedCard.card,
        );
      } else if (isPossibleToDeleteCard) {
        updatedSelectedCards.splice(selectedCardIndex, 1);
      }

      return updatedSelectedCards;
    });
    this.onSelectedCardsChange.emit(this.selectedCards()());
  }
}
