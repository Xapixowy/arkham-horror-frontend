import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteService } from '@Services/route.service';
import { LandingLayoutService } from '@Layouts/landing-layout/landing-layout.service';
import { UserMenuConfig } from '@Components/user-menu/_types/user-menu-config.type';
import { USER_MENU_CONFIG } from '@Layouts/landing-layout/_configs/user-menu.config';
import { UserMenuActionId } from '@Components/user-menu/_enums/user-menu-action-id.enum';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, TranslocoPipe],
  providers: [RouteService],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  private readonly routeService = inject(RouteService);
  private readonly landingLayoutService = inject(LandingLayoutService);

  protected readonly title = this.routeService.title;

  constructor() {
    this.updateUserMenu();
  }

  private updateUserMenu(): void {
    const userMenuConfig: UserMenuConfig = {
      ...USER_MENU_CONFIG,
      actions: USER_MENU_CONFIG.actions.filter((action) => action.id !== UserMenuActionId.DASHBOARD),
    };

    this.landingLayoutService.userMenuConfig.set(userMenuConfig);
  }
}
