import {SidebarSection} from '@Layouts/admin-layout/_types/sidebar-section.type';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {tablerCards, tablerDeviceGamepad, tablerHome, tablerUser} from '@ng-icons/tabler-icons';

export const SIDEBAR_CONFIG: {
  sections: SidebarSection[];
  icons: Record<string, string>;
} = {
  sections: [
    {
      title: '_AdminSidebar.Home',
      items: [
        {
          icon: 'tablerHome',
          label: '_AdminSidebar.Dashboard',
          route: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root]
        }
      ]
    },
    {
      title: '_AdminSidebar.Resources',
      items: [
        {
          icon: 'tablerCards',
          label: '_AdminSidebar.Cards',
          route: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root, APP_ROUTES_CONFIG.Admin.Cards.Root]
        },
        {
          icon: 'tablerUser',
          label: '_AdminSidebar.Characters',
          route: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root, APP_ROUTES_CONFIG.Admin.Characters.Root]
        },
      ]
    },
    {
      title: '_AdminSidebar.Game',
      items: [
        {
          icon: 'tablerDeviceGamepad',
          label: '_AdminSidebar.Game sessions',
          route: [APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root, APP_ROUTES_CONFIG.Admin.GameSessions.Root]
        }
      ]
    }
  ],
  icons: {
    tablerHome,
    tablerCards,
    tablerUser,
    tablerDeviceGamepad
  }
}
