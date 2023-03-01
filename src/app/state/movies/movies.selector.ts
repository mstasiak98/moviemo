import { createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducer';
import { AppState } from '../app.state';

export const selectMovies = (state: AppState) => state.movies;

export const selectAllMovies = createSelector(
  selectMovies,
  (state: MoviesState) => state.movies
);

export const selectMovieStatus = createSelector(
  selectMovies,
  (state: MoviesState) => state.status
);

export const selectPaginationData = createSelector(
  selectMovies,
  (state: MoviesState) => state.paginationData
);

export const selectAllGenres = createSelector(
  selectMovies,
  (state: MoviesState) => state.genres
);

export const selectMoviesState = createSelector(
  selectMovies,
  (state: MoviesState) => state
);

export const selectCurrentSortMode = createSelector(
  selectMovies,
  (state: MoviesState) => state.sortType
);

export const selectSnippedKeywordMovies = createSelector(
  selectMovies,
  (state: MoviesState) => state.snippedKeywordResults
);

export const selectInputSearchStatus = createSelector(
  selectMovies,
  (state: MoviesState) => state.searchInputStatus
);

export const selectCurrentKeyword = createSelector(
  selectMovies,
  (state: MoviesState) => state.searchKeyword
);
