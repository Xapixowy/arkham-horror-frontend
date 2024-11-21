import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { LoginFormControls } from '@Enums/form-controls/login-form-controls.enum';
import { Button } from 'primeng/button';
import { FormValidationMessageComponent } from '@Components/form-validation-message/form-validation-message.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [Button, FormValidationMessageComponent, InputTextModule, PaginatorModule, PasswordModule, TranslocoPipe],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AuthCardComponent {
  readonly heading = input.required<string>();
  readonly description = input.required<string>();

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
  protected readonly LoginFormControls = LoginFormControls;
}
