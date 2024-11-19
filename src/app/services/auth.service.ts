import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { RegisterResponse } from '@Types/responses/register-response.type';
import { map, Observable } from 'rxjs';
import { RegisterPayload } from '@Types/payloads/register-payload.type';
import { ENVIRONMENT } from '@Environments/environment';
import { VerifyPayload } from '@Types/payloads/verify-payload.type';
import { LoginPayload } from '@Types/payloads/login-payload.type';
import { LoginResponse } from '@Types/responses/login-response.type';
import { RemindPasswordPayload } from '@Types/payloads/remind-password-payload.type';
import { ResetPasswordPayload } from '@Types/payloads/reset-password-payload.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  register(payload: RegisterPayload): Observable<DataResponse<RegisterResponse>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/auth/register`, payload)
      .pipe(map((response) => response as DataResponse<RegisterResponse>));
  }

  verify(payload: VerifyPayload, token: string): Observable<never> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/auth/verify/${token}`, payload)
      .pipe(map((response) => response as never));
  }

  login(payload: LoginPayload): Observable<DataResponse<LoginResponse>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/auth/login`, payload)
      .pipe(map((response) => response as DataResponse<LoginResponse>));
  }

  remindPassword(payload: RemindPasswordPayload): Observable<never> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/auth/remind-password`, payload)
      .pipe(map((response) => response as never));
  }

  resetPassword(payload: ResetPasswordPayload, token: string): Observable<never> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/auth/reset-password/${token}`, payload)
      .pipe(map((response) => response as never));
  }
}
