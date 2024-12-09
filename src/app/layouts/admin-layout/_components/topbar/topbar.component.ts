import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarToggleButtonComponent } from '@Layouts/admin-layout/_components/sidebar-toggle-button/sidebar-toggle-button.component';
import { AvatarModule } from 'primeng/avatar';
import { LocalStorageService } from '@Services/local-storage.service';
import { User } from '@Models/user.model';
import { UserMenuComponent } from '@Components/user-menu/user-menu.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { AdminLayoutService } from '@Layouts/admin-layout/admin-layout.service';
import { USER_MENU_CONFIG } from '@Layouts/admin-layout/_configs/user-menu.config';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [SidebarToggleButtonComponent, AvatarModule, UserMenuComponent, TranslocoPipe],
  providers: [provideIcons(USER_MENU_CONFIG.icons)],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly USER_MENU_CONFIG = USER_MENU_CONFIG;
  protected readonly title = this.adminLayoutService.topbarTitle;

  get user(): User {
    return this.localStorageService.user!;
  }
}
