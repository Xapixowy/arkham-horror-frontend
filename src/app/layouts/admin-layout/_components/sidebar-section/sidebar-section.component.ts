import {Component, input} from '@angular/core';
import {SidebarItemComponent} from "@Layouts/admin-layout/_components/sidebar-item/sidebar-item.component";
import {SidebarItem} from '@Layouts/admin-layout/_types/sidebar-item.type';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-sidebar-section',
  standalone: true,
  imports: [
    SidebarItemComponent,
    TranslocoPipe
  ],
  templateUrl: './sidebar-section.component.html',
  styleUrl: './sidebar-section.component.scss'
})
export class SidebarSectionComponent {
  readonly title = input.required<string>();
  readonly items = input.required<SidebarItem []>();
}
