import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';
import { GAME_SESSION_PHASE_CONFIG } from '@Layouts/game-layout/_configs/game-session-phase.config';
import { TruncatePipe } from '@Pipes/truncate.pipe';

@Component({
  selector: 'app-game-session-phase',
  standalone: true,
  imports: [NgIcon, TranslocoPipe, TruncatePipe],
  providers: [provideIcons(GAME_SESSION_PHASE_CONFIG.icons)],
  templateUrl: './game-session-phase.component.html',
  styleUrl: './game-session-phase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionPhaseComponent {
  readonly phase = input.required<GameSessionPhase>();

  protected readonly icon = computed<string>(() => GameSessionPhaseComponent.getGameSessionPhaseIcon(this.phase()));

  static getGameSessionPhaseIcon(phase?: GameSessionPhase): string {
    switch (phase) {
      case GameSessionPhase.UPKEEP:
        return GAME_SESSION_PHASE_CONFIG.phaseIconMap[GameSessionPhase.UPKEEP];
      case GameSessionPhase.MOVEMENT:
        return GAME_SESSION_PHASE_CONFIG.phaseIconMap[GameSessionPhase.MOVEMENT];
      case GameSessionPhase.ENCOUNTERS_IN_ARKHAM:
        return GAME_SESSION_PHASE_CONFIG.phaseIconMap[GameSessionPhase.ENCOUNTERS_IN_ARKHAM];
      case GameSessionPhase.OTHER_WORLD_ENCOUNTERS:
        return GAME_SESSION_PHASE_CONFIG.phaseIconMap[GameSessionPhase.OTHER_WORLD_ENCOUNTERS];
      case GameSessionPhase.MYTHOS:
        return GAME_SESSION_PHASE_CONFIG.phaseIconMap[GameSessionPhase.MYTHOS];
      default:
        return GAME_SESSION_PHASE_CONFIG.defaultPhaseIcon;
    }
  }
}
