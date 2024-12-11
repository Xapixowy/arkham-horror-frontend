import { NavigationSection } from '@Layouts/landing-layout/_types/navigation-section.type';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { NavigationSection as NavigationSectionEnum } from '@Layouts/landing-layout/_enums/navigation-section.enum';

export const LANDING_LAYOUT_CONFIG: {
  navigation: NavigationSection[];
} = {
  navigation: [
    {
      id: NavigationSectionEnum.DASHBOARD_LINKS,
      position: 'left',
      items: [
        {
          label: '_LandingLayout.Game sessions history',
          type: 'link',
          routerLink: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Dashboard.Root],
          hide: true,
        },
        {
          label: '_LandingLayout.Statistics',
          type: 'link',
          routerLink: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Dashboard.Root],
          hide: true,
        },
      ],
    },
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
