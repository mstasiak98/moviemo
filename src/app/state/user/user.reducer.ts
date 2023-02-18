import { IUser } from '../../shared/data-access/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  authError,
  getUser,
  getUserMovieFavGenres,
  googleLogin,
  logout,
  saveUserFavGenres,
  userAuthenticated,
  userFavGenresNotSaved,
  userFavMovieGenresLoaded,
  userFavMovieGenresNotFound,
  userNotAuthenticated,
} from './user.actions';
import { Genre } from '../../movies/data-access/genre';

export interface UserState {
  user: IUser;
  loading: boolean;
  error: string;
  movie_genres: Genre[];
}

export const initialState = {
  user: null,
  loading: false,
  error: '',
  movie_genres: [],
};

export const userReducer = createReducer(
  initialState,
  on(getUser, (state) => ({ ...state, loading: true })),
  on(userAuthenticated, (state, { payload }) => ({
    ...state,
    user: payload,
    loading: false,
  })),
  on(userNotAuthenticated, (state) => ({
    ...initialState,
  })),
  on(googleLogin, (state) => ({
    ...state,
    loading: true,
  })),
  on(authError, (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
  })),
  on(logout, (state) => ({
    ...state,
    loading: true,
  })),
  on(getUserMovieFavGenres, (state) => ({
    ...state,
    loading: true,
  })),
  on(userFavMovieGenresLoaded, (state, { payload }) => ({
    ...state,
    movie_genres: payload,
    loading: false,
  })),
  on(userFavMovieGenresNotFound, (state) => ({
    ...state,
    movie_genres: [],
    loading: false,
  })),
  on(saveUserFavGenres, (state) => ({
    ...state,
    loading: true,
  })),

  on(userFavGenresNotSaved, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);
