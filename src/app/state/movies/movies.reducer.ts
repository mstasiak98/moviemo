import { Movie } from '../../movies/data-access/movie';
import { createReducer, on } from '@ngrx/store';
import {
  changePage,
  changeSortMode,
  loadMovieGenres,
  loadMovieGenresSuccess,
  loadMovies,
  loadMoviesFailure,
  loadMoviesSuccess,
  loadSnippedMoviesByKeyword,
  loadSnippedMoviesByKeywordSuccess,
  setGenreFilter,
} from './movies.actions';
import { PaginationData } from '../../shared/data-access/api-response';
import { Genre } from '../../shared/data-access/genre';
import { Status } from '../../shared/models/status';

export interface MoviesState {
  movies: Movie[];
  paginationData: PaginationData;
  sortType: string;
  error: string;
  status: Status;
  genres: Genre[];
  searchKeyword: string | null;
  genreFilter: string;
  snippedKeywordResults: Movie[];
  searchInputStatus: Status;
}

export const initialState: MoviesState = {
  movies: [],
  paginationData: { page: 1, total_pages: 0, total_results: 0 },
  error: '',
  status: 'pending',
  genres: [],
  sortType: 'popularity.desc',
  searchKeyword: null,
  genreFilter: '',
  snippedKeywordResults: [],
  searchInputStatus: 'pending',
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
  })),
  //trigger load movie genres
  on(loadMovieGenres, (state) => ({
    ...state,
  })),
  on(loadMovieGenresSuccess, (state, { genres }) => ({
    ...state,
    genres: genres,
  })),
  on(setGenreFilter, (state, { genreId }) => ({
    ...state,
    genreFilter: genreId,
    paginationData: { page: 1, total_pages: 0, total_results: 0 },
  })),
  on(changeSortMode, (state, { sortMode }) => ({
    ...state,
    sortType: sortMode,
    paginationData: { page: 1, total_pages: 0, total_results: 0 },
  })),
  //trigger loading snipped of movies by keyword for preview panel
  on(loadSnippedMoviesByKeyword, (state, { keyword }) => ({
    ...state,
    searchKeyword: keyword,
    searchInputStatus: 'loading',
  })),
  //trigger successfully loaded snipped of movies by keyword for preview panel
  on(loadSnippedMoviesByKeywordSuccess, (state, { data }) => ({
    ...state,
    snippedKeywordResults: data,
    searchInputStatus: 'success',
  }))
);
