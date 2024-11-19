import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {

  readonly isSidebarShown = signal<boolean>(true);

  toggleSidebar(): void {
    this.isSidebarShown.set(!this.isSidebarShown());
  }
}
