import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;

export const selectUserData = createSelector(
  selectUser,
  (state: UserState) => state
);

export const selectUserFavMovieGenres = createSelector(
  selectUser,
  (state: UserState) => state.movie_genres
);
