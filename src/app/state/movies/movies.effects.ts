import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { MovieService } from '../../movies/data-access/movie.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  changeSortMode,
  loadAllMovies,
  loadMovieGenres,
  loadMovieGenresSuccess,
  loadMovies,
  loadMoviesFailure,
  loadMoviesSuccess,
  loadNowPlaying,
  loadSnippedMoviesByKeyword,
  loadSnippedMoviesByKeywordSuccess,
  setGenreFilter,
  setKeywordFilter,
} from './movies.actions';
import {
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { ApiResponse } from '../../shared/data-access/api-response';
import { MovieGenreService } from '../../movies/data-access/movie-genre.service';
import { Genre } from '../../movies/data-access/genre';
import { selectMoviesState } from './movies.selector';
import { MovieType } from '../../movies/data-access/movie-type';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private movieService: MovieService,
    private movieGenreService: MovieGenreService
  ) {}

  loadAllMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllMovies),
      switchMap(({ page }) => {
        return this.handleApiResponse(
          this.movieService.getAllMoviesPaginated(page)
        );
      })
    );
  });

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovies, setGenreFilter, setKeywordFilter, changeSortMode),
      switchMap(({ page }) => {
        return this.store.select(selectMoviesState).pipe(
          take(1),
          mergeMap((state) => {
            if (state.searchKeyword) {
              return this.handleApiResponse(
                this.movieService.getMoviesByKeyword(state.searchKeyword, page)
              );
            } else {
              return this.handleApiResponse(
                this.movieService.getAllMoviesPaginated(
                  page,
                  state.sortType,
                  state.genreFilter
                )
              );
            }
          })
        );
      })
    );
  });

  loadNowPlaying$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNowPlaying),
      switchMap(({ page }) => {
        return this.handleApiResponse(
          this.movieService.getMoviesByType(MovieType.NOW_PLAYING, page)
        );
      })
    );
  });

  loadGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovieGenres),
      switchMap(() => {
        return this.movieGenreService
          .getAllMovieGenres()
          .pipe(
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
