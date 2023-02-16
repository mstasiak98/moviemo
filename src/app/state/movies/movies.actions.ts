import { createAction, props } from '@ngrx/store';
import { Movie } from '../../movies/data-access/movie';
import { ApiResponse } from '../../shared/data-access/api-response';
import { Genre } from '../../shared/data-access/genre';

export const loadAllMovies = createAction('[MovieList] Load Movies');

export const loadMovies = createAction(
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

export const loadMovieGenres = createAction(
  '[TheMovieDB API] Load Movie Genres'
);

export const loadMovieGenresSuccess = createAction(
  '[TheMovieDB API] Movie genres loaded',
  props<{ genres: Genre[] }>()
);

export const setGenreFilter = createAction(
  '[Movie list] Set genre filter',
  props<{ genreId: string; page: number }>()
);

export const changeSortMode = createAction(
  '[Movie list] Change sort mode',
  props<{ sortMode: string; page: number }>()
);

export const loadSnippedMoviesByKeyword = createAction(
  '[Movies Search] Load snipped movies by keyword',
  props<{ keyword: string; page: number }>()
);

export const loadSnippedMoviesByKeywordSuccess = createAction(
  '[Movies Search] Snipped of movies load success',
  props<{ data: Movie[] }>()
);

export const setKeywordFilter = createAction(
  '[Movie List] Set keyword search',
  props<{ keyword: string | null; page: number }>()
);
