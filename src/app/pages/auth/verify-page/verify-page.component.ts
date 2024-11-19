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
import { VerifyFormControls } from '@Enums/form-controls/verify-form-controls.enum';
import { VerifyPageService } from '@Pages/auth/verify-page/verify-page.service';
import { VerifyForm } from '@Types/forms/verify-form.type';

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
  providers: [VerifyPageService],
  templateUrl: './verify-page.component.html',
  styleUrl: './verify-page.component.scss',
})
export class VerifyPageComponent {
  private readonly verifyPageService = inject(VerifyPageService);

  protected get form(): FormGroup<VerifyForm> {
    return this.verifyPageService.form;
  }

  protected get email(): AbstractControl {
    return this.form.get(VerifyFormControls.EMAIL) as AbstractControl;
  }

  protected onSubmit(): void {
    this.verifyPageService.submit();
  }

  protected readonly APP_ROUTES_CONFIG = APP_ROUTES_CONFIG;
  protected readonly VerifyFormControls = VerifyFormControls;
  protected readonly REGEX_CONFIG = REGEX_CONFIG;
}
