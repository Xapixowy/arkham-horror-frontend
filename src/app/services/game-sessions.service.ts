import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '@Environments/environment';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

@Injectable({
  providedIn: 'root',
})
export class GameSessionsService {
  private readonly httpClient = inject(HttpClient);

  getAllGameSessions(): Observable<DataResponse<GameSessionDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/game-sessions`)
      .pipe(map((response) => response as DataResponse<GameSessionDto[]>));
  }

  removeGameSession(token: string): Observable<DataResponse<Omit<GameSessionDto, 'id'>>> {
    return this.httpClient
      .delete(`${ENVIRONMENT.api_url}/game-sessions/${token}`)
      .pipe(map((response) => response as DataResponse<Omit<GameSessionDto, 'id'>>));
  }

  resetGameSessionPhase(token: string): Observable<DataResponse<GameSessionDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/game-sessions/${token}/reset-phase`, {})
      .pipe(map((response) => response as DataResponse<GameSessionDto>));
  }

  nextGameSessionPhase(token: string): Observable<DataResponse<GameSessionDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/game-sessions/${token}/next-phase`, {})
      .pipe(map((response) => response as DataResponse<GameSessionDto>));
  }

  previousGameSessionPhase(token: string): Observable<DataResponse<GameSessionDto>> {
    return this.httpClient
      .post(`${ENVIRONMENT.api_url}/game-sessions/${token}/previous-phase`, {})
      .pipe(map((response) => response as DataResponse<GameSessionDto>));
  }
}
