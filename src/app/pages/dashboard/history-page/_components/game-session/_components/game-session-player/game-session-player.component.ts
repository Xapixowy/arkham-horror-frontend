import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { tablerUser } from '@ng-icons/tabler-icons';
import { Character } from '@Models/character.model';
import { Player } from '@Models/player.model';

@Component({
  selector: 'app-game-session-player',
  standalone: true,
  imports: [NgIcon, TranslocoPipe],
  providers: [
    provideIcons({
      tablerUser,
    }),
  ],
  templateUrl: './game-session-player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionPlayerComponent {
  readonly player = input.required<Player>();

  protected readonly character = computed<Character>(() => this.player().character!);
}
