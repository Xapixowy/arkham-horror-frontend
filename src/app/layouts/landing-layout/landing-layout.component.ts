import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TopbarComponent} from '@Layouts/landing-layout/_components/topbar/topbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [
    TopbarComponent,
    RouterOutlet
  ],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingLayoutComponent {

}
