import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {AdminLayoutService} from '@Layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [NgIcon, RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);

  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly route = input.required<string[]>();

  protected readonly strokeWidth = computed<number>(() => {
    const currentRoute = this.adminLayoutService.currentUrl().split('/');
    const currentPath = currentRoute[currentRoute.length - 1];
    const itemPath = this.route()[this.route().length - 1];

    return currentPath === itemPath ? 2 : 1;
  });
}
