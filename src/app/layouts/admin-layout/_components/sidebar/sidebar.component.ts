import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarSectionComponent } from '@Layouts/admin-layout/_components/sidebar-section/sidebar-section.component';
import { provideIcons } from '@ng-icons/core';
import { SIDEBAR_CONFIG } from '@Layouts/admin-layout/_configs/sidebar.config';
import { AdminLayoutService } from '@Layouts/admin-layout/admin-layout.service';
import { ColorThemeSwitcherComponent } from '@Features/color-theme/_components/color-theme-switcher/color-theme-switcher.component';
import { LanguageSwitcherComponent } from '@Features/language/_components/language-switcher/language-switcher.component';
import { LogoComponent } from '@Components/logo/logo.component';
import { LogoLayout } from '@Components/logo/_enums/logo-layout.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarSectionComponent, ColorThemeSwitcherComponent, LanguageSwitcherComponent, LogoComponent],
  providers: [provideIcons(SIDEBAR_CONFIG.icons)],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly adminLayoutService = inject(AdminLayoutService);

  protected readonly LogoLayout = LogoLayout;
  protected readonly SIDEBAR_CONFIG = SIDEBAR_CONFIG;

  protected readonly isSidebarShown = this.adminLayoutService.isSidebarShown;
}
