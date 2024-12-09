export type NavigationItem = {
  label: string;
  type: 'link' | 'button';
  hide?: boolean;
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
} & (NavigationItemLink | NavigationItemAction);

type NavigationItemLink = {
  routerLink: string[];
};

type NavigationItemAction = {
  action: () => void;
};
