import { SpeedDialItem } from '@Components/speed-dial/_types/speed-dial-item.type';
import { tablerArrowLeft, tablerArrowRight, tablerQuestionMark, tablerRefresh } from '@ng-icons/tabler-icons';

export const GAME_LAYOUT_CONFIG: {
  speedDialItems: SpeedDialItem[];
  icons: Record<string, string>;
} = {
  speedDialItems: [
    {
      label: '_GameLayout.Character lore',
      icon: 'tablerQuestionMark',
      action: () => {},
    },
    {
      label: '_GameLayout.Next game phase',
      icon: 'tablerArrowRight',
      action: () => {},
      severity: 'info',
    },
    {
      label: '_GameLayout.Refresh',
      icon: 'tablerRefresh',
      action: () => {},
      severity: 'info',
    },
    {
      label: '_GameLayout.Previous game phase',
      icon: 'tablerArrowLeft',
      action: () => {},
      severity: 'info',
    },
  ],
  icons: {
    tablerArrowLeft,
    tablerRefresh,
    tablerArrowRight,
    tablerQuestionMark,
  },
};
