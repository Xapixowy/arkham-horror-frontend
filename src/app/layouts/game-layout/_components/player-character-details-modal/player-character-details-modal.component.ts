import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { DialogModule } from 'primeng/dialog';
import { Character } from '@Models/character.model';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import {
  tablerBackpack,
  tablerBriefcase2,
  tablerCards,
  tablerPin,
  tablerPuzzle,
  tablerScript,
} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-player-character-details-modal',
  standalone: true,
  imports: [NgIcon, TranslocoPipe, DialogModule, NoContentComponent],
  providers: [provideIcons({ tablerPuzzle, tablerBriefcase2, tablerPin, tablerBackpack, tablerScript, tablerCards })],
  templateUrl: './player-character-details-modal.component.html',
  styleUrl: './player-character-details-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCharacterDetailsModalComponent {
  readonly visible = input.required<boolean>();
  readonly character = input.required<Character | null>();

  readonly onHide = output<void>();

  protected hideHandler(): void {
    this.onHide.emit();
  }
}
