import {DestroyRef, inject, Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormValidationService} from '@Services/form-validation.service';
import {AuthService} from '@Services/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '@Services/toast.service';
import {ErrorService} from '@Services/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {ResetPasswordForm} from '@Types/forms/reset-password-form.type';
import {ResetPasswordFormControls} from '@Enums/form-controls/reset-password-form-controls.enum';
import {RESET_PASSWORD_FORM_VALIDATORS} from '@Configs/form-validators/reset-password-form-validators.config';
import {ResetPasswordPayload} from '@Types/payloads/auth/reset-password-payload.type';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordPageService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly form: FormGroup<ResetPasswordForm> = this.initializeForm();

  initializeForm(): FormGroup<ResetPasswordForm> {
    return new FormGroup<ResetPasswordForm>({
      [ResetPasswordFormControls.EMAIL]: new FormControl(null, {
        validators: RESET_PASSWORD_FORM_VALIDATORS[ResetPasswordFormControls.EMAIL],
      }),
      [ResetPasswordFormControls.PASSWORD]: new FormControl(null, {
        validators: RESET_PASSWORD_FORM_VALIDATORS[ResetPasswordFormControls.PASSWORD],
      }),
      [ResetPasswordFormControls.PASSWORD_CONFIRMATION]: new FormControl(null, {
        validators: RESET_PASSWORD_FORM_VALIDATORS[ResetPasswordFormControls.PASSWORD_CONFIRMATION],
      }),
    });
  }

  submit(): void {
    if (FormValidationService.isFormInvalid(this.form)) {
      return;
    }

    const remindPasswordToken = this.activatedRoute.snapshot.params['token'];

    this.authService
      .resetPassword(this.form.value as ResetPasswordPayload, remindPasswordToken)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.success(
            '_ResetPasswordPage.Password reset',
            '_ResetPasswordPage.Password has been reset successfully',
          );
          this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]);
        },
        error: (response: HttpErrorResponse) => {
          this.errorService.throwError('_ResetPasswordPage.Password reset', response);
        },
      });
  }
}
