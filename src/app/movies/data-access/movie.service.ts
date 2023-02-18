import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieType } from './movie-type';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/data-access/api-response';
import { Movie } from './movie';
import { Store } from '@ngrx/store';
import {
  selectAllMovies,
  selectMoviesState,
} from '../../state/movies/movies.selector';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_URL = environment.theMovieDbApiUrl;
  private readonly API_KEY = environment.theMovieDbApiKey;

  constructor(private httpClient: HttpClient, private store: Store<any>) {}

  public getMovieDetails(movieId: number) {
    const url = `${this.API_URL}/movie/${movieId}`;
    return this.httpClient.get<Movie>(url, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }

  public getMoviesByType(
    movieType: MovieType,
    page: number = 1
  ): Observable<ApiResponse> {
    const url = `${this.API_URL}/movie/${movieType}`;
    return this.httpClient.get<ApiResponse>(url, {
      params: {
        api_key: this.API_KEY,
        page: page,
      },
    });
  }

  public getAllMoviesPaginated(
    page: number = 1,
    sortBy: string = 'popularity.desc',
    genreId: string = ''
  ): Observable<ApiResponse> {
    const url = `${this.API_URL}/discover/movie`;
    return this.httpClient.get<ApiResponse>(url, {
      params: {
        page: page,
        api_key: this.API_KEY,
        sort_by: sortBy,
        with_genres: genreId,
      },
    });
  }

  public getMoviesByKeyword(keyword: string, page: number = 1) {
    const url = `${this.API_URL}/search/movie`;
    return this.httpClient.get<ApiResponse>(url, {
      params: {
        api_key: this.API_KEY,
        query: keyword,
        page: page,
      },
    });
  }
}
