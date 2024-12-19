import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { GameSession } from '@Models/game-session.model';
import { PanelModule } from 'primeng/panel';
import { User } from '@Models/user.model';
import { TranslocoPipe } from '@jsverse/transloco';
import { GameSessionInformationComponent } from '@Pages/dashboard/history-page/_components/game-session/_components/game-session-information/game-session-information.component';
import { Character } from '@Models/character.model';
import { Player } from '@Models/player.model';
import { GameSessionPlayerComponent } from '@Pages/dashboard/history-page/_components/game-session/_components/game-session-player/game-session-player.component';
import { GameSessionStatisticsComponent } from '@Pages/dashboard/history-page/_components/game-session/_components/game-session-statistics/game-session-statistics.component';
import { DateHumanReadableComponent } from '@Components/date-human-readable/date-human-readable.component';
import { Button } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerHash } from '@ng-icons/tabler-icons';
import { GameSessionHeaderItemComponent } from '@Pages/dashboard/history-page/_components/game-session/_components/game-session-header-item/game-session-header-item.component';
import { Store } from '@ngrx/store';
import { joinGameSession } from '@States/game/game.actions';

@Component({
  selector: 'app-game-session',
  standalone: true,
  imports: [
    PanelModule,
    TranslocoPipe,
    GameSessionInformationComponent,
    GameSessionPlayerComponent,
    GameSessionStatisticsComponent,
    DateHumanReadableComponent,
    Button,
    NgIcon,
    GameSessionHeaderItemComponent,
  ],
  providers: [
    provideIcons({
      tablerHash,
    }),
  ],
  templateUrl: './game-session.component.html',
  styleUrl: './game-session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionComponent {
  private readonly store = inject(Store);

  readonly gameSession = input.required<GameSession>();
  readonly user = input.required<User>();

  protected readonly player = computed<Player | null>(() => {
    return this.gameSession().players?.find((player) => player.user?.id === this.user().id)!;
  });

  protected readonly header = computed<string>(() => `${this.gameSession().token} | ${this.player()?.character!.name}`);

  protected readonly character = computed<Character>(() => this.player()?.character!);

  onGameSessionJoin(): void {
    this.store.dispatch(joinGameSession({ gameSessionToken: this.gameSession().token }));
  }
}
