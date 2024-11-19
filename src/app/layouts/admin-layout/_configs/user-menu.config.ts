import {UserMenuAction} from '@Layouts/admin-layout/_types/user-menu-action.type';
import {tablerLogout} from '@ng-icons/tabler-icons';
import {UserMenuActionId} from '@Layouts/admin-layout/_enums/user-menu-action-id.enum';

export const USER_MENU_CONFIG: {
  actions: UserMenuAction[];
  icons: Record<string, string>;
} = {
  actions: [
    {
      id: UserMenuActionId.LOGOUT,
      icon: 'tablerLogout',
      label: '_UserMenu.Logout',
      action: () => console.log('Logout')
    }
  ],
  icons: {
    tablerLogout
  }
}
