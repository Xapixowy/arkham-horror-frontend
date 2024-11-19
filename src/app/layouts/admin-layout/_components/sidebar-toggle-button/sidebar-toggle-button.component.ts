import {Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerMenu2} from '@ng-icons/tabler-icons';
import {AdminLayoutService} from '@Layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-sidebar-toggle-button',
  standalone: true,
  imports: [
    NgIcon
  ],
  providers: [
    provideIcons({
      tablerMenu2
    })
  ],
  templateUrl: './sidebar-toggle-button.component.html',
  styleUrl: './sidebar-toggle-button.component.scss'
})
export class SidebarToggleButtonComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);

  onClick(): void {
    this.adminLayoutService.toggleSidebar();
  }
}
