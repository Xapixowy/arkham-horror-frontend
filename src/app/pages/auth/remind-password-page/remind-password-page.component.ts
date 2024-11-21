import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthCardComponent } from '@Components/auth-card/auth-card.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { FormValidationMessageComponent } from '@Components/form-validation-message/form-validation-message.component';
import { REGEX_CONFIG } from '@Configs/regex.config';
import { RemindPasswordPageService } from '@Pages/auth/remind-password-page/remind-password-page.service';
import { RemindPasswordForm } from '@Types/forms/remind-password-form.type';
import { RemindPasswordFormControls } from '@Enums/form-controls/remind-password-form-controls.enum';

@Component({
  selector: 'app-verify-page',
  standalone: true,
  imports: [
    AuthCardComponent,
    TranslocoPipe,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    Button,
    RouterLink,
    FormValidationMessageComponent,
  ],
  providers: [RemindPasswordPageService],
  templateUrl: './remind-password-page.component.html',
  styleUrl: './remind-password-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindPasswordPageComponent {
  private readonly remindPasswordPageService = inject(RemindPasswordPageService);

  protected get form(): FormGroup<RemindPasswordForm> {
    return this.remindPasswordPageService.form;
  }

  protected get email(): AbstractControl {
    return this.form.get(RemindPasswordFormControls.EMAIL) as AbstractControl;
  }

  protected onSubmit(): void {
    this.remindPasswordPageService.submit();
  }

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
  protected readonly RemindPasswordFormControls = RemindPasswordFormControls;
  protected readonly REGEX_CONFIG = REGEX_CONFIG;
}
