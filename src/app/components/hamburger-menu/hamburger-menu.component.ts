import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerMenu2, tablerX } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [NgIcon],
  providers: [
    provideIcons({
      tablerMenu2,
      tablerX,
    }),
  ],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuComponent {
  readonly isOpened = input.required<boolean>();
}
