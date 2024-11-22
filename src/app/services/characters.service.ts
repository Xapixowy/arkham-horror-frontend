import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataResponse} from '@Types/data-response.type';
import {map, Observable} from 'rxjs';
import {ENVIRONMENT} from '@Environments/environment';
import {HttpServiceHelper} from '@Helpers/http-service.helper';
import {CharacterDto} from '@Types/dtos/character-dto.type';
import {AddCharacterPayload} from '@Types/payloads/characters/add-character-payload.type';
import {UpdateCharacterPayload} from '@Types/payloads/characters/update-character-payload.type';
import {AddCharacterImagePayload} from '@Types/payloads/characters/add-character-image-payload.type';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly httpClient = inject(HttpClient);

  getAllCharacters(): Observable<DataResponse<CharacterDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/characters`, {
        params: {
          originalLanguage: true,
        },
      })
      .pipe(map((response) => response as DataResponse<CharacterDto[]>));
  }

  addCharacter(payload: AddCharacterPayload): Observable<DataResponse<CharacterDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/characters`, payload)
      .pipe(map((response) => response as DataResponse<CharacterDto>));
  }

  updateCharacter(id: number, payload: UpdateCharacterPayload): Observable<DataResponse<CharacterDto>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/characters/${id}`, payload)
      .pipe(map((response) => response as DataResponse<CharacterDto>));
  }

  removeCharacter(id: number): Observable<DataResponse<Omit<CharacterDto, 'id'>>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/characters/${id}`)
      .pipe(map((response) => response as DataResponse<Omit<CharacterDto, 'id'>>));
  }

  addCharacterImage(id: number, payload: AddCharacterImagePayload): Observable<DataResponse<CharacterDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/characters/${id}/photo`, HttpServiceHelper.createFormData(payload))
      .pipe(map((response) => response as DataResponse<CharacterDto>));
  }

  removeCharacterImage(id: number): Observable<DataResponse<CharacterDto>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/characters/${id}/photo`)
      .pipe(map((response) => response as DataResponse<CharacterDto>));
  }
}
