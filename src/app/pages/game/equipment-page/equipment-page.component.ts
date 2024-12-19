import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { provideIcons } from '@ng-icons/core';
import { tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';
import { EquipmentPageService } from '@Pages/game/equipment-page/_services/equipment-page.service';
import { CardSelectorComponent } from '@Components/card-selector/card-selector.component';
import { SkeletonModule } from 'primeng/skeleton';
import { PlayerCard } from '@Models/player-card.model';
import { CharacterCard } from '@Models/character-card.model';

@Component({
  selector: 'app-equipment-page',
  standalone: true,
  imports: [TranslocoPipe, ButtonIconOnlyComponent, CardSelectorComponent, SkeletonModule],
  providers: [
    EquipmentPageService,
    provideIcons({
      tablerPlus,
      tablerMinus,
    }),
  ],
  templateUrl: './equipment-page.component.html',
  styleUrl: './equipment-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentPageComponent {
  private readonly equipmentPageService = inject(EquipmentPageService);

  protected readonly form = this.equipmentPageService.gameEquipmentForm;
  protected readonly player = this.equipmentPageService.player;
  protected readonly playerEquipment = this.equipmentPageService.playerEquipment;
  protected readonly selectedPlayerCards = this.equipmentPageService.selectedPlayerCards;
  protected readonly isLoading = this.equipmentPageService.isFirstLoading;

  onMoneyDecrease(): void {
    this.equipmentPageService.decreaseMoney();
  }

  onMoneyIncrease(): void {
    this.equipmentPageService.increaseMoney();
  }

  onCluesDecrease(): void {
    this.equipmentPageService.decreaseClues();
  }

  onCluesIncrease(): void {
    this.equipmentPageService.increaseClues();
  }

  updatePlayerCards(selectedPlayerCards: PlayerCard[] | CharacterCard[]): void {
    this.equipmentPageService.updatePlayerCards(selectedPlayerCards);
  }
}
