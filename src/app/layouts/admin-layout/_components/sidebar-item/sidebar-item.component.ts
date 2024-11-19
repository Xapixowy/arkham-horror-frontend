import {Component, input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    TranslocoPipe
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly route = input.required<string[]>();
}
