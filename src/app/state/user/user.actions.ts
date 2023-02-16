import { createAction, props } from '@ngrx/store';
import { IUserFirestore } from '../../shared/models/user.model';

export const getUser = createAction('[Auth] Get User');
export const userAuthenticated = createAction(
  '[Auth] Authenticated',
  props<{ payload: any }>()
);
export const userNotAuthenticated = createAction('[Auth] Not Authenticated');

export const googleLogin = createAction('[Auth] Google login attempt');
export const logout = createAction('[Auth] Logout');

export const authError = createAction(
  '[Auth] Error',
  props<{ payload: any }>()
);

export const getUserMovieFavGenres = createAction(
  '[User Fav Genres] Get user fav movie genres'
);

export const userFavMovieGenresLoaded = createAction(
  '[User Fav Genres] User fav movie genres loaded successfully',
  props<{ payload: any }>()
);

export const userFavMovieGenresNotFound = createAction(
  '[User Fav Genres] User fav movie genres not found'
);

export const saveUserFavGenres = createAction(
  '[User Fav Genres] Saving user fav genres',
  props<{ data: IUserFirestore }>()
);

export const userFavGenresNotSaved = createAction(
  '[User Fav Genres] Saving user fav genres',
  props<{ error: any }>()
);
