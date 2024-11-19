import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataResponse} from '@Types/data-response.type';
import {map, Observable} from 'rxjs';
import {ENVIRONMENT} from '@Environments/environment';
import {GetAllCardsResponse} from '@Types/responses/cards/get-all-cards-response.type';
import {RemoveCardResponse} from '@Types/responses/cards/remove-card-response.type';

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
}
