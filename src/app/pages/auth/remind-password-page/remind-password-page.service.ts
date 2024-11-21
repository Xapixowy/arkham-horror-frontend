import {DestroyRef, inject, Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormValidationService} from '@Services/form-validation.service';
import {AuthService} from '@Services/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '@Services/toast.service';
import {ErrorService} from '@Services/error.service';
import {Router} from '@angular/router';
import {APP_ROUTES_CONFIG} from '@Configs/routes.config';
import {RemindPasswordForm} from '@Types/forms/remind-password-form.type';
import {RemindPasswordFormControls} from '@Enums/form-controls/remind-password-form-controls.enum';
import {REMIND_PASSWORD_FORM_VALIDATORS} from '@Configs/form-validators/remind-password-form-validators.config';
import {RemindPasswordPayload} from '@Types/payloads/auth/remind-password-payload.type';

@Injectable({
  providedIn: 'root',
})
export class RemindPasswordPageService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly form: FormGroup<RemindPasswordForm> = this.initializeForm();

  initializeForm(): FormGroup<RemindPasswordForm> {
    return new FormGroup<RemindPasswordForm>({
      [RemindPasswordFormControls.EMAIL]: new FormControl(null, {
        validators: REMIND_PASSWORD_FORM_VALIDATORS[RemindPasswordFormControls.EMAIL],
      }),
    });
  }

  submit(): void {
    if (FormValidationService.isFormInvalid(this.form)) {
      return;
    }

    this.authService
      .remindPassword(this.form.value as RemindPasswordPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.success(
            '_RemindPasswordPage.Password reminder',
            '_RemindPasswordPage.Your password reminder has been sent successfully',
          );
          this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]);
        },
        error: (response: HttpErrorResponse) => {
          this.errorService.throwError('_RemindPasswordPage.Password reminder', response);
        },
      });
  }
}
