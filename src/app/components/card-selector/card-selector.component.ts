import { ChangeDetectionStrategy, Component, inject, input, signal, WritableSignal } from '@angular/core';
import { CharacterCard } from '@Models/character-card.model';
import { CardSelectorService } from '@Components/card-selector/card-selector.service';
import { AsyncPipe } from '@angular/common';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgPlaceholderComponent } from '@Components/img-placeholder/img-placeholder.component';
import { Card } from '@Models/card.model';
import { Button } from 'primeng/button';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { provideIcons } from '@ng-icons/core';
import { tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';
import { TruncatePipe } from '@Pipes/truncate.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

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
  ],
  providers: [CardSelectorService, provideIcons({ tablerMinus, tablerPlus })],
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSelectorComponent {
  private readonly cardSelectorService = inject(CardSelectorService);

  readonly cards = this.cardSelectorService.cards;

  readonly selectedCharacterCards = input.required<WritableSignal<CharacterCard[]>>();

  private readonly isCardBeingSelected = signal<boolean>(false);

  onCardSelection(event: DropdownChangeEvent, component: Dropdown): void {
    if (this.isCardBeingSelected()) {
      return;
    }

    const selectedCard = event.value as Card;

    this.isCardBeingSelected.set(true);
    this.selectedCharacterCards().update((characterCards) => {
      const updatedCharacterCards = [...characterCards];
      const selectedCardIndex = updatedCharacterCards.findIndex(
        (characterCard) => characterCard.card!.id === selectedCard.id,
      );

      if (selectedCardIndex >= 0) {
        updatedCharacterCards[selectedCardIndex].quantity += 1;
      } else {
        updatedCharacterCards.push({
          id: selectedCard.id,
          card: selectedCard,
          quantity: 1,
        });
      }
      return updatedCharacterCards;
    });
    component.clear();
    setTimeout(() => this.isCardBeingSelected.set(false), 0);
  }

  onCardQuantityChange(characterCard: CharacterCard, modifier: number): void {
    this.selectedCharacterCards().update((characterCards) => {
      const updatedCharacterCards = [...characterCards];
      const selectedCardIndex = updatedCharacterCards.findIndex((cc) => cc.id === characterCard.id);

      const selectedCardExists = selectedCardIndex >= 0;
      const isPossibleToIncreaseQuantity =
        selectedCardExists && modifier > 0 && updatedCharacterCards[selectedCardIndex].quantity <= 8;
      const isPossibleToDecreaseQuantity =
        selectedCardExists && modifier < 0 && updatedCharacterCards[selectedCardIndex].quantity >= 2;
      const isPossibleToDeleteCard =
        selectedCardExists && modifier < 0 && updatedCharacterCards[selectedCardIndex].quantity === 1;

      if (isPossibleToIncreaseQuantity || isPossibleToDecreaseQuantity) {
        const newCharacter = (updatedCharacterCards[selectedCardIndex] = new CharacterCard(
          updatedCharacterCards[selectedCardIndex].id,
          updatedCharacterCards[selectedCardIndex].quantity + modifier,
          updatedCharacterCards[selectedCardIndex].card,
        ));
      } else if (isPossibleToDeleteCard) {
        updatedCharacterCards.splice(selectedCardIndex, 1);
      }

      return updatedCharacterCards;
    });
  }
}
