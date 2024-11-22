import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Route, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isSidebarShown = signal<boolean>(true);
  readonly currentUrl = signal<string>(APP_ROUTES_CONFIG.Default);
  readonly topbarTitle = signal<string>('');

  constructor() {
    this.subscribeForRouteChanges();
  }

  toggleSidebar(): void {
    this.isSidebarShown.set(!this.isSidebarShown());
  }

  private subscribeForRouteChanges(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof ActivationEnd) {
        const routeConfig = this.findDeepestChild(event.snapshot);

        this.topbarTitle.set(routeConfig?.title ? `_Title.${routeConfig.title}` : '');
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.url);
      }
    });
  }

  private findDeepestChild(snapshot: ActivatedRouteSnapshot, route: Route | null = null): Route | null {
    if (snapshot.firstChild) {
      return this.findDeepestChild(snapshot.firstChild, snapshot.firstChild.routeConfig);
    }

    return route;
  }
}
