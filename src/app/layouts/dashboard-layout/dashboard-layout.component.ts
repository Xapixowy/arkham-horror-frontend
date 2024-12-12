import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteService } from '@Services/route.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, TranslocoPipe],
  providers: [RouteService],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  private readonly routeService = inject(RouteService);

  protected readonly title = this.routeService.title;
}
