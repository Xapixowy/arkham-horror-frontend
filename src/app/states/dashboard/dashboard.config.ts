import { StateStatus } from '@Enums/state-status.enum';
import { DashboardState } from '@States/dashboard/dashboard.state';

export const DASHBOARD_STATE_CONFIG: {
  initialState: DashboardState;
  toastTranslationKeys: {
    user: string;
  };
} = {
  initialState: {
    gameSessions: [],
    userStatistics: null,
    error: null,
    status: StateStatus.PENDING,
  },
  toastTranslationKeys: {
    user: '_DashboardState.User',
  },
};
