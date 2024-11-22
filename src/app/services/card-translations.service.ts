import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '@Environments/environment';
import { CardTranslationDto } from '@Types/dtos/card-translation-dto.type';
import { Language } from '@Features/language/_enums/language.enum';
import { AddCardTranslationPayload } from '@Types/payloads/card-translations/add-card-translation-payload.type';
import { UpdateCardTranslationPayload } from '@Types/payloads/card-translations/update-card-translation-payload.type';

@Injectable({
  providedIn: 'root',
})
export class CardTranslationsService {
  private readonly httpClient = inject(HttpClient);

  getAllCardTranslation(cardId: number): Observable<DataResponse<CardTranslationDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/cards/${cardId}/translations`)
      .pipe(map((response) => response as DataResponse<CardTranslationDto[]>));
  }

  addCardTranslation(cardId: number, payload: AddCardTranslationPayload): Observable<DataResponse<CardTranslationDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/cards/${cardId}/translations`, payload)
      .pipe(map((response) => response as DataResponse<CardTranslationDto>));
  }

  updateCardTranslation(
    cardId: number,
    locale: Language,
    payload: UpdateCardTranslationPayload,
  ): Observable<DataResponse<CardTranslationDto>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/cards/${cardId}/translations/${locale}`, payload)
      .pipe(map((response) => response as DataResponse<CardTranslationDto>));
  }

  removeCardTranslation(cardId: number, locale: Language): Observable<DataResponse<Omit<CardTranslationDto, 'id'>>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/cards/${cardId}/translations/${locale}`)
      .pipe(map((response) => response as DataResponse<Omit<CardTranslationDto, 'id'>>));
  }
}
