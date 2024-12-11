import { inject, Injectable, signal } from '@angular/core';
import { RouteService } from '@Services/route.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLayoutService {
  private readonly routeService = inject(RouteService);

  readonly isSidebarShown = signal<boolean>(true);
  readonly currentUrl = this.routeService.currentUrl;
  readonly topbarTitle = this.routeService.title;

  toggleSidebar(): void {
    this.isSidebarShown.set(!this.isSidebarShown());
  }
}
