import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataResponse} from '@Types/data-response.type';
import {map, Observable} from 'rxjs';
import {ENVIRONMENT} from '@Environments/environment';
import {Language} from '@Features/language/_enums/language.enum';
import {CharacterTranslationDto} from '@Types/dtos/character-translation-dto.type';
import {
  AddCharacterTranslationPayload
} from '@Types/payloads/character-translations/add-character-translation-payload.type';
import {
  UpdateCharacterTranslationPayload
} from '@Types/payloads/character-translations/update-character-translation-payload.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterTranslationsService {
  private readonly httpClient = inject(HttpClient);

  getAllCharacterTranslations(characterId: number): Observable<DataResponse<CharacterTranslationDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/characters/${characterId}/translations`)
      .pipe(map((response) => response as DataResponse<CharacterTranslationDto[]>));
  }

  addCharacterTranslation(characterId: number, payload: AddCharacterTranslationPayload): Observable<DataResponse<CharacterTranslationDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/characters/${characterId}/translations`, payload)
      .pipe(map((response) => response as DataResponse<CharacterTranslationDto>));
  }

  updateCharacterTranslation(
    characterId: number,
    locale: Language,
    payload: UpdateCharacterTranslationPayload,
  ): Observable<DataResponse<CharacterTranslationDto>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/characters/${characterId}/translations/${locale}`, payload)
      .pipe(map((response) => response as DataResponse<CharacterTranslationDto>));
  }

  removeCharacterTranslation(characterId: number, locale: Language): Observable<DataResponse<Omit<CharacterTranslationDto, 'id'>>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/characters/${characterId}/translations/${locale}`)
      .pipe(map((response) => response as DataResponse<Omit<CharacterTranslationDto, 'id'>>));
  }
}
