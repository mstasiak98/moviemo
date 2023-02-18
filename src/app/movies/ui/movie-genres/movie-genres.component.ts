import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../../data-access/genre';
import { IUser } from '../../../shared/data-access/user.model';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { UserState } from '../../../state/user/user.reducer';

@Component({
  selector: 'app-movie-genres',
  templateUrl: './movie-genres.component.html',
  styleUrls: ['./movie-genres.component.scss'],
})
export class MovieGenresComponent {
  @Input() genres$: Observable<Genre[]>;
  @Input() userFavGenres$: Observable<Genre[]>;
  @Input() authUser$: Observable<UserState>;
  openDialog: boolean = false;
  constructor() {}
}
