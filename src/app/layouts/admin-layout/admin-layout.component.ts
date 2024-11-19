import {Component, inject} from '@angular/core';
import {SidebarComponent} from '@Layouts/admin-layout/_components/sidebar/sidebar.component';
import {TopbarComponent} from '@Layouts/admin-layout/_components/topbar/topbar.component';
import {RouterOutlet} from '@angular/router';
import {AdminLayoutService} from '@Layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    RouterOutlet
  ],
  providers: [
    AdminLayoutService
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);

  readonly isSidebarShown = this.adminLayoutService.isSidebarShown;
}
