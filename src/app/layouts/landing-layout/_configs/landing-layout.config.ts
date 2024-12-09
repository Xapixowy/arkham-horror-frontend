import { NavigationSection } from '@Layouts/landing-layout/_types/navigation-section.type';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { NavigationSection as NavigationSectionEnum } from '@Layouts/landing-layout/_enums/navigation-section.enum';

export const LANDING_LAYOUT_CONFIG: {
  navigation: NavigationSection[];
} = {
  navigation: [
    {
      id: NavigationSectionEnum.AUTH_BUTTONS,
      position: 'right',
      items: [
        {
          label: '_LandingLayout.Register',
          type: 'button',
          routerLink: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Register],
          severity: 'secondary',
        },
        {
          label: '_LandingLayout.Login',
          type: 'button',
          routerLink: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login],
        },
      ],
    },
  ],
};
