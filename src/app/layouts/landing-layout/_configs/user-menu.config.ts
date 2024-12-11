import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { tablerLogout } from '@ng-icons/tabler-icons';

export const USER_MENU_CONFIG: UserMenuConfig = {
  actions: [
    {
      id: UserMenuActionId.LOGOUT,
      icon: 'tablerLogout',
      label: '_UserMenu.Logout',
      action: () => {},
    },
  ],
  icons: {
    tablerLogout,
  },
};
