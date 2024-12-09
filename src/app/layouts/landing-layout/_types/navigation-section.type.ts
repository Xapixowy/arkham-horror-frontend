import { NavigationItem } from '@Layouts/landing-layout/_types/navigation-item.type';
import { NavigationSection as NavigationSectionEnum } from '@Layouts/landing-layout/_enums/navigation-section.enum';

export type NavigationSection = {
  id: NavigationSectionEnum;
  position: 'left' | 'right';
  items: NavigationItem[];
};
