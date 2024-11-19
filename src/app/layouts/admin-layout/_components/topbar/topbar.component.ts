import {Component, DestroyRef, inject, signal} from '@angular/core';
import {
  SidebarToggleButtonComponent
} from '@Layouts/admin-layout/_components/sidebar-toggle-button/sidebar-toggle-button.component';
import {AvatarModule} from 'primeng/avatar';
import {LocalStorageService} from '@Services/local-storage.service';
import {User} from '@Models/user.model';
import {UserMenuComponent} from '@Layouts/admin-layout/_components/user-menu/user-menu.component';
import {TranslocoPipe} from '@jsverse/transloco';
import {ActivationEnd, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    SidebarToggleButtonComponent,
    AvatarModule,
    UserMenuComponent,
    TranslocoPipe
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly title = signal<string>('this.getInitialTitle()');

  constructor() {
    this.listenForTitleChanges();
  }

  get user(): User {
    return this.localStorageService.user!;
  }

  private listenForTitleChanges(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof ActivationEnd) {
        const routeTitle = event.snapshot.firstChild?.title;
        this.title.set(routeTitle ? `_Title.${routeTitle}` : '');
      }
    });
  }
}
