import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '@Environments/environment';
import { AddCardPayload } from '@Types/payloads/cards/add-card-payload.type';
import { AddCardFrontImagePayload } from '@Types/payloads/cards/add-card-front-image-payload.type';
import { AddCardBackImagePayload } from '@Types/payloads/cards/add-card-back-image-payload.type';
import { HttpServiceHelper } from '@Helpers/http-service.helper';
import { UpdateCardPayload } from '@Types/payloads/cards/update-card-payload.type';
import { CardDto } from '@Types/dtos/card-dto.type';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly httpClient = inject(HttpClient);

  getAllCards(): Observable<DataResponse<CardDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/cards`, {
        params: {
          originalLanguage: true,
        },
      })
      .pipe(map((response) => response as DataResponse<CardDto[]>));
  }

  addCard(payload: AddCardPayload): Observable<DataResponse<CardDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards`, payload)
      .pipe(map((response) => response as DataResponse<CardDto>));
  }

  updateCard(id: number, payload: UpdateCardPayload): Observable<DataResponse<CardDto>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/cards/${id}`, payload)
      .pipe(map((response) => response as DataResponse<CardDto>));
  }

  removeCard(id: number): Observable<DataResponse<Omit<CardDto, 'id'>>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${id}`)
      .pipe(map((response) => response as DataResponse<Omit<CardDto, 'id'>>));
  }

  addCardFrontImage(id: number, payload: AddCardFrontImagePayload): Observable<DataResponse<CardDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards/${id}/front-photo`, HttpServiceHelper.createFormData(payload))
      .pipe(map((response) => response as DataResponse<CardDto>));
  }

  removeCardFrontImage(id: number): Observable<DataResponse<CardDto>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${id}/front-photo`)
      .pipe(map((response) => response as DataResponse<CardDto>));
  }

  addCardBackImage(id: number, payload: AddCardBackImagePayload): Observable<DataResponse<CardDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards/${id}/back-photo`, HttpServiceHelper.createFormData(payload))
      .pipe(map((response) => response as DataResponse<CardDto>));
  }

  removeCardBackImage(id: number): Observable<DataResponse<CardDto>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${id}/back-photo`)
      .pipe(map((response) => response as DataResponse<CardDto>));
  }
}
