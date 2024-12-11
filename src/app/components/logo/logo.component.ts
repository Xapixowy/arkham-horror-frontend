import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { LogoLayout } from '@Components/logo/_enums/logo-layout.enum';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private readonly router = inject(Router);
  readonly layout = input<LogoLayout>(LogoLayout.LANDING);
  readonly onClick = output<void>();

  logoClickHandler(): void {
    this.onClick.emit();

    if (this.layout() === LogoLayout.ADMIN) {
      this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root]);
    } else {
      this.router.navigate([APP_ROUTES_CONFIG.Default]);
    }
  }
}
