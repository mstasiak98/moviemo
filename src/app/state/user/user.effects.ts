import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
import {
  catchError,
  map,
  from,
  of,
  switchMap,
  Observable,
  tap,
  take,
  distinctUntilChanged,
  flatMap,
  mergeMap,
  exhaustMap,
} from 'rxjs';
import firebase from 'firebase/compat/app';
import { UserService } from '../../shared/data-access/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUserFirestore } from '../../shared/models/user.model';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private afs: AngularFirestore
  ) {}

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUser),
      switchMap(() => {
        return this.afAuth.authState.pipe(
          map((resp) => {
            if (resp) {
              return userAuthenticated({
                payload: { uid: resp.uid, displayName: resp.displayName },
              });
            } else {
              return userNotAuthenticated();
            }
          }),
          catchError((error: any) => of(authError({ payload: error.message })))
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(googleLogin),
      switchMap(() => {
        return from(this.googleLogin()).pipe(
          map(() => getUser()),
          catchError((err) => of(authError({ payload: err.message })))
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        return of(this.afAuth.signOut()).pipe(
          tap(() => location.reload()),
          map((authData) => userNotAuthenticated()),
          catchError((err) => of(authError({ payload: err.message })))
        );
      })
    );
  });

  userFavGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserMovieFavGenres),
      switchMap(() => {
        return this.userService.getUserMovieFavGenres();
      }),
      mergeMap((actions) => actions),
      map((action) => {
        if (action) {
          return userFavMovieGenresLoaded({
            payload: action.movie_genres,
          });
        } else {
          return userFavMovieGenresNotFound();
        }
      }),
      catchError((err) => of(authError({ payload: err.message })))
    );
  });

  saveFavGenres$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(saveUserFavGenres),
        switchMap(({ data }) => {
          return this.userService
            .addUserFavGenres(data)
            .pipe(
              catchError((err) =>
                of(userFavGenresNotSaved({ error: err.message }))
              )
            );
        })
      );
    },
    { dispatch: false }
  );

  private googleLogin(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }
}
