import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { RegisterResponse } from '@Types/responses/register-response.type';
import { Observable } from 'rxjs';
import { RegisterPayload } from '@Types/payloads/register-payload.type';
import { ENVIRONMENT } from '@Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  register(payload: RegisterPayload): Observable<DataResponse<RegisterResponse>> {
    return this.httpClient.post<DataResponse<RegisterResponse>>(`${ENVIRONMENT.api_url}/auth/register`, payload);
  }
}
