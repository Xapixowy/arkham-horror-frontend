import { GameSessionPhase } from '@Enums/game-sessions/game-session-phase.enum';
import {
  tablerCampfire,
  tablerHourglass,
  tablerOmega,
  tablerShoe,
  tablerSpiral,
  tablerWorld,
} from '@ng-icons/tabler-icons';

export const GAME_SESSION_PHASE_CONFIG: {
  phaseIconMap: Record<GameSessionPhase, string>;
  defaultPhaseIcon: string;
  icons: Record<string, string>;
} = {
  phaseIconMap: {
    [GameSessionPhase.UPKEEP]: 'tablerCampfire',
    [GameSessionPhase.MOVEMENT]: 'tablerShoe',
    [GameSessionPhase.ENCOUNTERS_IN_ARKHAM]: 'tablerWorld',
    [GameSessionPhase.OTHER_WORLD_ENCOUNTERS]: 'tablerSpiral',
    [GameSessionPhase.MYTHOS]: 'tablerOmega',
  },
  defaultPhaseIcon: 'tablerHourglass',
  icons: {
    tablerHourglass,
    tablerCampfire,
    tablerShoe,
    tablerWorld,
    tablerSpiral,
    tablerOmega,
  },
};
