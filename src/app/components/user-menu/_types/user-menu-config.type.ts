import { UserMenuAction } from '@Components/user-menu/_types/user-menu-action.type';

export type UserMenuConfig = {
  actions: UserMenuAction[];
  icons: Record<string, string>;
};
