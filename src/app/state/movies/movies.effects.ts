import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { MoviedbApiService } from '../../shared/data-access/moviedb-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  changePage,
  loadMovieGenres,
  loadMovieGenresSuccess,
  loadMovies,
  loadMoviesFailure,
  loadMoviesSuccess,
  loadSnippedMoviesByKeyword,
  loadSnippedMoviesByKeywordSuccess,
} from './movies.actions';
import {
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ApiResponse } from '../../shared/data-access/api-response';
import { MovieGenreService } from '../../movies/data-access/movie-genre.service';
import { Genre } from '../../shared/data-access/genre';
import { selectMoviesState } from './movies.selector';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private movieService: MoviedbApiService,
    private movieGenreService: MovieGenreService
  ) {}

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovies),
      switchMap(() => {
        return this.handleApiResponse(
          this.movieService.getAllMoviesPaginated()
        );
      })
    );
  });

  changePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePage),
      switchMap(({ page }) => {
        return this.store.select(selectMoviesState).pipe(
          take(1),
          mergeMap((state) => {
            return this.handleApiResponse(
              this.movieService.getAllMoviesPaginated(
                page,
                state.sortType,
                state.genreFilter
              )
            );
          })
        );
      })
    );
  });

  loadGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovieGenres),
      switchMap(() => {
        return this.movieGenreService.getAllMovieGenres().pipe(
          tap((resp) => console.log(resp)),
          map((resp: { genres: Genre[] }) => loadMovieGenresSuccess(resp))
        );
      })
    );
  });

  loadSnippedMoviesByKeyword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSnippedMoviesByKeyword),
      switchMap(({ keyword, page }) => {
        return this.movieService.getMoviesByKeyword(keyword).pipe(
          tap((res) => console.log('resu;t = ', res)),
          map((res: ApiResponse) =>
            loadSnippedMoviesByKeywordSuccess({ data: res.results })
          ),
          catchError((err: any) =>
            of(loadMoviesFailure({ error: err.status_message }))
          )
        );
      })
    );
  });

  private handleApiResponse(resp: Observable<ApiResponse>): Observable<any> {
    return resp.pipe(
      map((resp) => loadMoviesSuccess({ data: resp })),
      catchError((error: any) =>
        of(loadMoviesFailure({ error: error.status_message }))
      )
    );
  }
}
