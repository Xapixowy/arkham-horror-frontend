import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarItemComponent } from '@Layouts/admin-layout/_components/sidebar-item/sidebar-item.component';
import { SidebarSectionComponent } from '@Layouts/admin-layout/_components/sidebar-section/sidebar-section.component';
import { provideIcons } from '@ng-icons/core';
import { SIDEBAR_CONFIG } from '@Layouts/admin-layout/_configs/sidebar.config';
import { TranslocoPipe } from '@jsverse/transloco';
import { AdminLayoutService } from '@Layouts/admin-layout/admin-layout.service';
import { ColorThemeSwitcherComponent } from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import { LanguageSwitcherComponent } from '@Features/language/_components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarItemComponent,
    SidebarSectionComponent,
    TranslocoPipe,
    ColorThemeSwitcherComponent,
    LanguageSwitcherComponent,
  ],
  providers: [provideIcons(SIDEBAR_CONFIG.icons)],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);

  readonly isSidebarShown = this.adminLayoutService.isSidebarShown;

  readonly SIDEBAR_CONFIG = SIDEBAR_CONFIG;
}
