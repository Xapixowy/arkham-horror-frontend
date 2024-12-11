import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GameSession } from '@Models/game-session.model';

@Component({
  selector: 'app-game-session',
  standalone: true,
  imports: [],
  templateUrl: './game-session.component.html',
  styleUrl: './game-session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionComponent {
  readonly gameSession = input.required<GameSession>();
}
