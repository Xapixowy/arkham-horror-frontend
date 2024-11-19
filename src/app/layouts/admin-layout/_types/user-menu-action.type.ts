import {UserMenuActionId} from '@Layouts/admin-layout/_enums/user-menu-action-id.enum';

export type UserMenuAction = {
  id: UserMenuActionId;
  icon: string;
  label: string;
  action: () => void;
}
