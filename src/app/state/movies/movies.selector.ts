import { createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducer';
import { AppState } from '../app.state';

export const selectMovies = (state: AppState) => state.movies;

export const selectAllMovies = createSelector(
  selectMovies,
  (state: MoviesState) => state.movies
);

export const selectPaginationData = createSelector(
  selectMovies,
  (state: MoviesState) => state.paginationData
);
