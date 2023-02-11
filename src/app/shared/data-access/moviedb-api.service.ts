import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieType } from '../../movies/data-access/movie-type';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class MoviedbApiService {
  private readonly API_URL = environment.theMovieDbApiUrl;
  private readonly API_KEY = environment.theMovieDbApiKey;

  constructor(private httpClient: HttpClient) {}

  public getMoviesByType(movieType: MovieType) {
    const url = `${this.API_URL}/movie/${movieType}`;
    return this.httpClient.get(url, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }

  public getAllMoviesPaginated(page: number = 1): Observable<ApiResponse> {
    const url = `${this.API_URL}/discover/movie`;
    return this.httpClient.get<ApiResponse>(url, {
      params: {
        page: page,
        api_key: this.API_KEY,
      },
    });
  }
}
