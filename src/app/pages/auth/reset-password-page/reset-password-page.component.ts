import { Component, inject } from '@angular/core';
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
import { ResetPasswordPageService } from '@Pages/auth/reset-password-page/reset-password-page.service';
import { ResetPasswordForm } from '@Types/forms/reset-password-form.type';
import { ResetPasswordFormControls } from '@Enums/form-controls/reset-password-form-controls.enum';

@Component({
  selector: 'app-register-page',
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
  providers: [ResetPasswordPageService],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent {
  private readonly resetPasswordPageService = inject(ResetPasswordPageService);

  protected get form(): FormGroup<ResetPasswordForm> {
    return this.resetPasswordPageService.form;
  }

  protected get email(): AbstractControl {
    return this.form.get(ResetPasswordFormControls.EMAIL) as AbstractControl;
  }

  protected get password(): AbstractControl {
    return this.form.get(ResetPasswordFormControls.PASSWORD) as AbstractControl;
  }

  protected get password_confirmation(): AbstractControl {
    return this.form.get(ResetPasswordFormControls.PASSWORD_CONFIRMATION) as AbstractControl;
  }

  protected onSubmit(): void {
    this.resetPasswordPageService.submit();
  }

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
  protected readonly REGEX_CONFIG = REGEX_CONFIG;
  protected readonly ResetPasswordFormControls = ResetPasswordFormControls;
}
