import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { SpeedDialComponent } from '@Components/speed-dial/speed-dial.component';
import { GAME_LAYOUT_CONFIG } from '@Layouts/game-layout/_configs/game-layout.config';
import { provideIcons } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@Services/local-storage.service';
import { joinGameSession } from '@States/game/game.actions';

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [RouterOutlet, Button, SpeedDialComponent],
  providers: [provideIcons(GAME_LAYOUT_CONFIG.icons)],
  templateUrl: './game-layout.component.html',
  styleUrl: './game-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLayoutComponent {
  private readonly store = inject(Store);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly GAME_LAYOUT_CONFIG = GAME_LAYOUT_CONFIG;

  constructor() {
    this.updateGameSession();
  }

  private updateGameSession(): void {
    const gameSessionToken = this.localStorageService.gameSession?.token;

    if (!gameSessionToken) {
      return;
    }

    this.store.dispatch(joinGameSession({ gameSessionToken }));
  }
}
