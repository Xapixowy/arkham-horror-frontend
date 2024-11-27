import { DestroyRef, inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from '@Services/form-validation.service';
import { AuthService } from '@Services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { ToastService } from '@Services/toast.service';
import { ErrorService } from '@Services/error.service';
import { Router } from '@angular/router';
import { APP_ROUTES_CONFIG } from '@Configs/routes.config';
import { LoginForm } from '@Types/forms/login-form.type';
import { LoginFormControls } from '@Enums/form-controls/login-form-controls.enum';
import { LoginFormValidators } from '@Configs/form-validators/login-form-validators.config';
import { LoginPayload } from '@Types/payloads/auth/login-payload.type';
import { LoginResponse } from '@Types/responses/auth/login-response.type';
import { UserRole } from '@Enums/users/user-role.enum';
import { LocalStorageService } from '@Services/local-storage.service';
import { User } from '@Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly errorService = inject(ErrorService);
  private readonly localStorageService = inject(LocalStorageService);

  readonly form: FormGroup<LoginForm> = this.initializeForm();

  initializeForm(): FormGroup<LoginForm> {
    return new FormGroup<LoginForm>({
      [LoginFormControls.EMAIL]: new FormControl(null, {
        validators: LoginFormValidators[LoginFormControls.EMAIL],
      }),
      [LoginFormControls.PASSWORD]: new FormControl(null, {
        validators: LoginFormValidators[LoginFormControls.PASSWORD],
      }),
    });
  }

  submit(): void {
    if (FormValidationService.isFormInvalid(this.form)) {
      return;
    }

    this.authService
      .login(this.form.value as LoginPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: DataResponse<LoginResponse>) => {
          this.toastService.success('_LoginPage.Login', '_LoginPage.You have been logged in successfully');
          this.localStorageService.user = User.fromDto(response.data);
          if (response.data.role === UserRole.ADMIN) {
            this.router.navigate([APP_ROUTES_CONFIG.Default, APP_ROUTES_CONFIG.Admin.Root]);
            return;
          }
          this.router.navigate([APP_ROUTES_CONFIG.Default]);
        },
        error: (response: HttpErrorResponse) => {
          this.errorService.throwError('_LoginPage.Login', response);
        },
      });
  }
}
