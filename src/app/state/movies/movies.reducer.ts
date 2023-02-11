import { Movie } from '../../movies/data-access/movie';
import { createReducer, on } from '@ngrx/store';
import {
  changePage,
  loadMovies,
  loadMoviesFailure,
  loadMoviesSuccess,
} from './movies.actions';
import { PaginationData } from '../../shared/data-access/api-response';

export interface MoviesState {
  movies: Movie[];
  paginationData: PaginationData;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: MoviesState = {
  movies: [],
  paginationData: { page: 1, total_pages: 0, total_results: 0 },
  error: '',
  status: 'pending',
};

export const moviesReducer = createReducer(
  initialState,
  //trigger loading movies
  on(loadMovies, (state) => ({ ...state, status: 'loading' })),
  //trigger change page
  on(changePage, (state, { page }) => ({ ...state, status: 'loading' })),
  //handle successfully loaded movies
  on(loadMoviesSuccess, (state, { data }) => ({
    ...state,
    movies: data.results,
    paginationData: {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    },
    status: 'success',
    error: '',
  })),
  //handle loading failure
  on(loadMoviesFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  }))
);
