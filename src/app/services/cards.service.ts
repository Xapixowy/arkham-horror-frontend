import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataResponse} from '@Types/data-response.type';
import {map, Observable} from 'rxjs';
import {ENVIRONMENT} from '@Environments/environment';
import {GetAllCardsResponse} from '@Types/responses/cards/get-all-cards-response.type';
import {RemoveCardResponse} from '@Types/responses/cards/remove-card-response.type';
import {AddCardPayload} from '@Types/payloads/cards/add-card-payload.type';
import {AddCardResponse} from '@Types/responses/cards/add-card-response.type';
import {AddCardFrontImagePayload} from '@Types/payloads/cards/add-card-front-image-payload.type';
import {AddCardFrontImageResponse} from '@Types/responses/cards/add-card-front-image-response.type';
import {RemoveCardFrontImageResponse} from '@Types/responses/cards/remove-card-front-image-response.type';
import {AddCardBackImagePayload} from '@Types/payloads/cards/add-card-back-image-payload.type';
import {AddCardBackImageResponse} from '@Types/responses/cards/add-card-back-image-response.type';
import {RemoveCardBackImageResponse} from '@Types/responses/cards/remove-card-back-image-response.type';
import {HttpServiceHelper} from '@Helpers/http-service.helper';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly httpClient = inject(HttpClient);

  getAllCards(): Observable<DataResponse<GetAllCardsResponse>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/cards`, {
        params: {
          originalLanguage: true
        }
      })
      .pipe(map((response) => response as DataResponse<GetAllCardsResponse>));
  }

  removeCard(id: number): Observable<DataResponse<RemoveCardResponse>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${id}`)
      .pipe(map((response) => response as DataResponse<RemoveCardResponse>));
  }

  addCard(payload: AddCardPayload): Observable<DataResponse<AddCardResponse>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards`, payload)
      .pipe(map((response) => response as DataResponse<AddCardResponse>));
  }

  addCardFrontImage(id: number, payload: AddCardFrontImagePayload): Observable<DataResponse<AddCardFrontImageResponse>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards/${id}/front-photo`, HttpServiceHelper.createFormData(payload))
      .pipe(map((response) => response as DataResponse<AddCardFrontImageResponse>));
  }

  removeCardFrontImage(id: number): Observable<DataResponse<RemoveCardFrontImageResponse>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${id}/front-photo`)
      .pipe(map((response) => response as DataResponse<RemoveCardFrontImageResponse>));
  }

  addCardBackImage(id: number, payload: AddCardBackImagePayload): Observable<DataResponse<AddCardBackImageResponse>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards/${id}/back-photo`, HttpServiceHelper.createFormData(payload))
      .pipe(map((response) => response as DataResponse<AddCardBackImageResponse>));
  }

  removeCardBackImage(id: number): Observable<DataResponse<RemoveCardBackImageResponse>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${id}/back-photo`)
      .pipe(map((response) => response as DataResponse<RemoveCardBackImageResponse>));
  }
}
