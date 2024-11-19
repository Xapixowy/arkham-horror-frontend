import { DestroyRef, inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterFormControls } from '@Enums/form-controls/register-form-controls.enum';
import { REGISTER_FORM_VALIDATORS } from '@Configs/form-validators/register-form-validators.config';
import { FormValidationService } from '@Services/form-validation.service';
import { RegisterForm } from '@Types/forms/register-form.type';
import { AuthService } from '@Services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterPayload } from '@Types/payloads/register-payload.type';
import { RegisterResponse } from '@Types/responses/register-response.type';
import { HttpErrorResponse } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';

@Injectable({
  providedIn: 'root',
})
export class RegisterPageService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly form: FormGroup<RegisterForm> = this.initializeForm();

  initializeForm(): FormGroup<RegisterForm> {
    return new FormGroup<RegisterForm>({
      [RegisterFormControls.NAME]: new FormControl(null, {
        validators: REGISTER_FORM_VALIDATORS[RegisterFormControls.NAME],
      }),
      [RegisterFormControls.EMAIL]: new FormControl(null, {
        validators: REGISTER_FORM_VALIDATORS[RegisterFormControls.EMAIL],
      }),
      [RegisterFormControls.PASSWORD]: new FormControl(null, {
        validators: REGISTER_FORM_VALIDATORS[RegisterFormControls.PASSWORD],
      }),
      [RegisterFormControls.PASSWORD_CONFIRMATION]: new FormControl(null, {
        validators: REGISTER_FORM_VALIDATORS[RegisterFormControls.PASSWORD_CONFIRMATION],
      }),
    });
  }

  submit(): void {
    if (FormValidationService.isFormInvalid(this.form)) {
      return;
    }

    this.authService
      .register(this.form.value as RegisterPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: DataResponse<RegisterResponse>) => {
          this.toastService.success(
            '_RegisterPage.Registration',
            '_RegisterPage.Your account has been created successfully',
          );
          this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]);
        },
        error: (response: HttpErrorResponse) => {
          this.errorService.throwError('_RegisterPage.Registration', response);
        },
      });
  }
}
