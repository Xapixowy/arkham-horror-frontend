import { SpeedDialItem } from '@Components/speed-dial/_types/speed-dial-item.type';
import {
  tablerArrowLeft,
  tablerArrowRight,
  tablerBrain,
  tablerCards,
  tablerChartBar,
  tablerCoin,
  tablerDeviceGamepad,
  tablerHeart,
  tablerHourglass,
  tablerHourglassHigh,
  tablerHourglassLow,
  tablerInfoCircle,
  tablerQuestionMark,
  tablerRefresh,
  tablerUserQuestion,
  tablerX,
  tablerZoom,
} from '@ng-icons/tabler-icons';
import { GameSpeedDialId } from '@Layouts/game-layout/_enums/game-speed-dial-id.enum';

export const GAME_LAYOUT_CONFIG: {
  speedDialItems: SpeedDialItem[];
  icons: Record<string, string>;
} = {
  speedDialItems: [
    {
      id: GameSpeedDialId.CHARACTER_DETAILS,
      label: '_GameLayout.Character details',
      icon: 'tablerInfoCircle',
      action: () => {},
    },
    {
      id: GameSpeedDialId.PLAYER_STATISTICS,
      label: '_GameLayout.Player statistics',
      icon: 'tablerChartBar',
      action: () => {},
    },
    {
      id: GameSpeedDialId.RENEW_CHARACTER,
      label: '_GameLayout.Renew character',
      icon: 'tablerUserQuestion',
      severity: 'warning',
      action: () => {},
    },
    {
      id: GameSpeedDialId.NEXT_GAME_PHASE,
      label: '_GameLayout.Next game phase',
      icon: 'tablerArrowRight',
      action: () => {},
      severity: 'info',
      hide: true,
    },
    {
      id: GameSpeedDialId.RESET_GAME_PHASE,
      label: '_GameLayout.Refresh game phase',
      icon: 'tablerRefresh',
      action: () => {},
      severity: 'info',
      hide: true,
    },
    {
      id: GameSpeedDialId.PREVIOUS_GAME_PHASE,
      label: '_GameLayout.Previous game phase',
      icon: 'tablerArrowLeft',
      action: () => {},
      severity: 'info',
      hide: true,
    },
  ],
  icons: {
    tablerArrowLeft,
    tablerRefresh,
    tablerArrowRight,
    tablerInfoCircle,
    tablerChartBar,
    tablerUserQuestion,
    tablerCoin,
    tablerZoom,
    tablerHeart,
    tablerBrain,
    tablerCards,
    tablerDeviceGamepad,
    tablerQuestionMark,
    tablerX,
    tablerHourglassHigh,
    tablerHourglass,
    tablerHourglassLow,
  },
};
