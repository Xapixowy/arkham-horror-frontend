import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HamburgerMenuComponent } from '@Components/hamburger-menu/hamburger-menu.component';
import { NavigationComponent } from '@Layouts/landing-layout/_components/navigation/navigation.component';
import { LandingLayoutService } from '@Layouts/landing-layout/landing-layout.service';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet, HamburgerMenuComponent],
  providers: [LandingLayoutService],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingLayoutComponent {}
