import { DestroyRef, inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from '@Services/form-validation.service';
import { AuthService } from '@Services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { VerifyForm } from '@Types/forms/verify-form.type';
import { VerifyFormControls } from '@Enums/form-controls/verify-form-controls.enum';
import { VERIFY_FORM_VALIDATORS } from '@Configs/form-validators/verify-form-validators.config';
import { VerifyPayload } from '@Types/payloads/verify-payload.type';

@Injectable({
  providedIn: 'root',
})
export class VerifyPageService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly form: FormGroup<VerifyForm> = this.initializeForm();

  initializeForm(): FormGroup<VerifyForm> {
    return new FormGroup<VerifyForm>({
      [VerifyFormControls.EMAIL]: new FormControl(null, {
        validators: VERIFY_FORM_VALIDATORS[VerifyFormControls.EMAIL],
      }),
    });
  }

  submit(): void {
    if (FormValidationService.isFormInvalid(this.form)) {
      return;
    }

    const verifyToken = this.activatedRoute.snapshot.params['token'];

    this.authService
      .verify(this.form.value as VerifyPayload, verifyToken)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Auth.Root, APP_ROUTES_CONFIG.Auth.Login]);
          this.toastService.success(
            '_VerifyPage.Verification',
            '_VerifyPage.Your account has been verified successfully',
          );
        },
        error: (response: HttpErrorResponse) => {
          this.errorService.throwError('_VerifyPage.Verification', response);
        },
      });
  }
}
