import { createAction, props } from '@ngrx/store';
import { Movie } from '../../movies/data-access/movie';
import { ApiResponse } from '../../shared/data-access/api-response';

export const loadMovies = createAction('[MovieList] Load Movies');

export const changePage = createAction(
  '[MovieList] Change Page',
  props<{ page: number }>()
);

export const loadMoviesSuccess = createAction(
  '[TheMovieDB API] Movies Load Success',
  props<{ data: ApiResponse }>()
);

export const loadMoviesFailure = createAction(
  '[TheMovieDB API] Movies Load Failure',
  props<{ error: string }>()
);
