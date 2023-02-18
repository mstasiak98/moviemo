import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { IUserFirestore } from './user.model';
import {
  distinctUntilChanged,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../state/user/user.selector';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ObjectHelper } from '../utils/object-helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private store: Store<any>,
    private afAuth: AngularFireAuth
  ) {}

  addUserFavGenres(userFavGenres: IUserFirestore): Observable<any> {
    const ref = doc(this.afs.firestore, 'users', userFavGenres.uid);
    return from(setDoc(ref, userFavGenres));
  }

  updateUserFavGenres(userFavGenres: IUserFirestore): Observable<any> {
    const ref = doc(this.afs.firestore, 'users', userFavGenres.uid);
    return from(updateDoc(ref, { ...userFavGenres }));
  }

  getUserMovieFavGenres() {
    return this.afAuth.authState.pipe(
      map((resp) => {
        if (resp) {
          return this.afs
            .collection<IUserFirestore>('users', (ref) => {
              return ref.where('uid', '==', resp.uid);
            })
            .valueChanges()
            .pipe(
              distinctUntilChanged((prev, curr) => {
                return ObjectHelper.equals(prev, curr);
              }),
              map((value) => {
                return value[0];
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }
}
