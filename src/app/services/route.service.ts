import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Route, Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly titleSignal = signal<string>('');
  private readonly currentUrlSignal = signal<string>(APP_ROUTES_CONFIG.Default);

  readonly title = computed<string>(() => this.titleSignal());
  readonly currentUrl = computed<string>(() => this.currentUrlSignal());

  constructor() {
    this.initializeService();
    this.subscribeForRouteChanges();
  }

  private initializeService(): void {
    this.currentUrlSignal.set(this.router.url);
    this.titleSignal.set((this.findDeepestChild(this.router.routerState.snapshot.root)?.title as string) ?? '');
  }

  private subscribeForRouteChanges(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof ActivationEnd) {
        const routeConfig = this.findDeepestChild(event.snapshot);

        this.titleSignal.set(routeConfig?.title ? `_Title.${routeConfig.title}` : '');
      }

      if (event instanceof NavigationEnd) {
        this.currentUrlSignal.set(event.url);
      }

      console.log(this.currentUrlSignal(), this.titleSignal());
    });
  }

  private findDeepestChild(snapshot: ActivatedRouteSnapshot, route: Route | null = null): Route | null {
    if (snapshot.firstChild) {
      return this.findDeepestChild(snapshot.firstChild, snapshot.firstChild.routeConfig);
    }

    return route;
  }
}
