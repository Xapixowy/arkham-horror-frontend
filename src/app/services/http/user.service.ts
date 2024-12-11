import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '@Types/data-response.type';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '@Environments/environment';
import { UserStatistics } from '@Types/user/user-statistics.type';
import { GameSessionDto } from '@Types/dtos/game-session-dto.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  getUserStatistics(userId: number): Observable<DataResponse<UserStatistics>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/users/${userId}/statistics`)
      .pipe(map((response) => response as DataResponse<UserStatistics>));
  }

  getUserGameSessions(userId: number): Observable<DataResponse<GameSessionDto[]>> {
    return this.httpClient
      .get(`${ENVIRONMENT.api_url}/users/${userId}/game-sessions`)
      .pipe(map((response) => response as DataResponse<GameSessionDto[]>));
  }
}
