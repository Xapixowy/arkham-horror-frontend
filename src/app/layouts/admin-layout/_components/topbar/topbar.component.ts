import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  SidebarToggleButtonComponent
} from '@Layouts/admin-layout/_components/sidebar-toggle-button/sidebar-toggle-button.component';
import {AvatarModule} from 'primeng/avatar';
import {LocalStorageService} from '@Services/local-storage.service';
import {User} from '@Models/user.model';
import {UserMenuComponent} from '@Layouts/admin-layout/_components/user-menu/user-menu.component';
import {TranslocoPipe} from '@jsverse/transloco';
import {AdminLayoutService} from '@Layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [SidebarToggleButtonComponent, AvatarModule, UserMenuComponent, TranslocoPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);
  private readonly localStorageService = inject(LocalStorageService);

  protected readonly title = this.adminLayoutService.topbarTitle

  get user(): User {
    return this.localStorageService.user!;
  }
}
