import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GameSession } from '@Models/game-session.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { tablerDeviceGamepad } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-game-session-information',
  standalone: true,
  imports: [NgIcon, TranslocoPipe],
  providers: [
    provideIcons({
      tablerDeviceGamepad,
    }),
  ],
  templateUrl: './game-session-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionInformationComponent {
  readonly gameSession = input.required<GameSession>();
}
