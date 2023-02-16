import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Genre } from '../../shared/data-access/genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieGenreService {
  private readonly API_URL = environment.theMovieDbApiUrl + '/genre/movie/list';
  private readonly API_KEY = environment.theMovieDbApiKey;

  constructor(private httpClient: HttpClient) {}

  getAllMovieGenres(): Observable<{ genres: Genre[] }> {
    return this.httpClient.get<{ genres: Genre[] }>(this.API_URL, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }
}
