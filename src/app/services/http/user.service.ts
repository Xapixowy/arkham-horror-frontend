import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '@Environments/environment';
import { UserStatisticsDto } from '@Types/dtos/user-statistics-dto.type';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  getUserStatistics(userId: number): Observable<DataResponse<UserStatisticsDto>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/users/${userId}/statistics`)
      .pipe(map((response) => response as DataResponse<UserStatisticsDto>));
  }

  getUserGameSessions(userId: number): Observable<DataResponse<GameSessionDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/users/${userId}/game-sessions`)
      .pipe(map((response) => response as DataResponse<GameSessionDto[]>));
  }
}
