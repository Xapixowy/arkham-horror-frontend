export type SpeedDialItem = {
  label: string;
  icon: string;
  action: () => void;
  hide?: boolean;
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
};
