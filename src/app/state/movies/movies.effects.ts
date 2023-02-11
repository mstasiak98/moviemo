import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { MoviedbApiService } from '../../shared/data-access/moviedb-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  changePage,
  loadMovies,
  loadMoviesFailure,
  loadMoviesSuccess,
} from './movies.actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ApiResponse } from '../../shared/data-access/api-response';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private movieService: MoviedbApiService
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
        return this.handleApiResponse(
          this.movieService.getAllMoviesPaginated(page)
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
