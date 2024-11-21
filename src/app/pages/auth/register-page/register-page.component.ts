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
import { RegisterFormControls } from '@Enums/form-controls/register-form-controls.enum';
import { RegisterPageService } from '@Pages/auth/register-page/register-page.service';
import { RegisterForm } from '@Types/forms/register-form.type';
import { REGEX_CONFIG } from '@Configs/regex.config';

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
  providers: [RegisterPageService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly registerPageService = inject(RegisterPageService);

  protected get form(): FormGroup<RegisterForm> {
    return this.registerPageService.form;
  }

  protected get name(): AbstractControl {
    return this.form.get(RegisterFormControls.NAME) as AbstractControl;
  }

  protected get email(): AbstractControl {
    return this.form.get(RegisterFormControls.EMAIL) as AbstractControl;
  }

  protected get password(): AbstractControl {
    return this.form.get(RegisterFormControls.PASSWORD) as AbstractControl;
  }

  protected get password_confirmation(): AbstractControl {
    return this.form.get(RegisterFormControls.PASSWORD_CONFIRMATION) as AbstractControl;
  }

  protected onSubmit(): void {
    this.registerPageService.submit();
  }

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
  protected readonly RegisterFormControls = RegisterFormControls;
  protected readonly REGEX_CONFIG = REGEX_CONFIG;
}
