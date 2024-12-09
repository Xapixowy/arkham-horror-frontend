import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { tablerHome, tablerLogout } from '@ng-icons/tabler-icons';

export const USER_MENU_CONFIG: UserMenuConfig = {
  actions: [
    {
      id: UserMenuActionId.DASHBOARD,
      icon: 'tablerHome',
      label: '_UserMenu.Dashboard',
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
    tablerHome,
    tablerLogout,
  },
};
