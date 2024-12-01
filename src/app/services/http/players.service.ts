import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataResponse} from '@Types/data-response.type';
import {map, Observable} from 'rxjs';
import {ENVIRONMENT} from '@Environments/environment';
import {UpdatePlayerPayload} from '@Types/payloads/players/update-player-payload.type';
import {PlayerDto} from '@Types/dtos/player-dto.type';
import {AssignPlayerCardsPayload} from '@Types/payloads/players/assign-player-cards-payload.type';
import {RemovePlayerCardsPayload} from '@Types/payloads/players/remove-player-cards-payload.type';
import {PlayerCardDto} from '@Types/dtos/player-card-dto.type';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private readonly httpClient = inject(HttpClient);

  loadPlayers(gameSessionToken: string): Observable<DataResponse<PlayerDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/game-sessions/${gameSessionToken}/players`)
      .pipe(map((response) => response as DataResponse<PlayerDto[]>));
  }

  updatePlayer(
    gameSessionToken: string,
    playerToken: string,
    payload: UpdatePlayerPayload,
  ): Observable<DataResponse<PlayerDto>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/game-sessions/${gameSessionToken}/players/${playerToken}`, payload)
      .pipe(map((response) => response as DataResponse<PlayerDto>));
  }

  removePlayer(gameSessionToken: string, playerToken: string): Observable<DataResponse<Omit<PlayerDto, 'id'>>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/game-sessions/${gameSessionToken}/players/${playerToken}`)
      .pipe(map((response) => response as DataResponse<Omit<PlayerDto, 'id'>>));
  }

  renewPlayerCharacter(gameSessionToken: string, playerToken: string): Observable<DataResponse<PlayerDto>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/game-sessions/${gameSessionToken}/players/${playerToken}/renew-character`, {})
      .pipe(map((response) => response as DataResponse<PlayerDto>));
  }

  assignPlayerCards(
    gameSessionToken: string,
    playerToken: string,
    payload: AssignPlayerCardsPayload,
  ): Observable<DataResponse<PlayerCardDto[]>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/game-sessions/${gameSessionToken}/players/${playerToken}/assign-cards`, payload)
      .pipe(map((response) => response as DataResponse<PlayerCardDto[]>));
  }

  removePlayerCards(
    gameSessionToken: string,
    playerToken: string,
    payload: RemovePlayerCardsPayload,
  ): Observable<DataResponse<PlayerCardDto[]>> {
    return this.httpClient
      .put(`${ENVIRONMENT.api_url}/game-sessions/${gameSessionToken}/players/${playerToken}/remove-cards`, payload)
      .pipe(map((response) => response as DataResponse<PlayerCardDto[]>));
  }
}
