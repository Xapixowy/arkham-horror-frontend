import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { tablerLayoutDashboard, tablerLogout } from '@ng-icons/tabler-icons';

export const USER_MENU_CONFIG: UserMenuConfig = {
  actions: [
    {
      id: UserMenuActionId.ADMIN_DASHBOARD,
      icon: 'tablerLayoutDashboard',
      label: '_UserMenu.Admin dashboard',
      action: () => {},
    },
    {
      id: UserMenuActionId.LOGOUT,
      icon: 'tablerLogout',
      label: '_UserMenu.Logout',
      action: () => {},
    },
  ],
  icons: {
    tablerLogout,
    tablerLayoutDashboard,
  },
};
