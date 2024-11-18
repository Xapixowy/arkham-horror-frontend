import { inject, Injectable } from '@angular/core';
import { ToastService } from '@Services/toast.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { getEnumNames } from 'ts-enum-helpers';
import { HttpError } from '@Enums/http-error.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly toastService = inject(ToastService);

  throwError(title: string, response: HttpErrorResponse): void {
    if (!response) {
      console.error('🚀 ~ unhandled error', response);
      return;
    }

    const { status } = response;

    if (status === HttpStatusCode.Forbidden || status === HttpStatusCode.Unauthorized) {
      return;
    }

    this.handleError(title, response);
  }

  handleError(title: string, response: HttpErrorResponse): void {
    const errors = getEnumNames(HttpError);
    const { error } = response.error;

    if (errors.includes(error)) {
      this.handleErrorNotification(title, error);
    } else {
      this.handleErrorNotification(title, 'Something went wrong');
      console.error('🚀 ~ error:', error);
    }
  }

  handleErrorNotification(titleKey: string, errorKey: string): void {
    this.toastService.danger(titleKey, `_Errors.${errorKey}`);
  }
}
