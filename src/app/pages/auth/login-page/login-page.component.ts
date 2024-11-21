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
import { LoginPageService } from '@Pages/auth/login-page/login-page.service';
import { LoginForm } from '@Types/forms/login-form.type';
import { LoginFormControls } from '@Enums/form-controls/login-form-controls.enum';

@Component({
  selector: 'app-login-page',
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
  providers: [LoginPageService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly loginPageService = inject(LoginPageService);

  protected get form(): FormGroup<LoginForm> {
    return this.loginPageService.form;
  }

  protected get email(): AbstractControl {
    return this.form.get(LoginFormControls.EMAIL) as AbstractControl;
  }

  protected get password(): AbstractControl {
    return this.form.get(LoginFormControls.PASSWORD) as AbstractControl;
  }

  protected onSubmit(): void {
    this.loginPageService.submit();
  }

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
  protected readonly REGEX_CONFIG = REGEX_CONFIG;
  protected readonly LoginFormControls = LoginFormControls;
}
