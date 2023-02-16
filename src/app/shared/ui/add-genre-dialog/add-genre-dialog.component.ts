import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Genre } from '../../data-access/genre';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserState } from '../../../state/user/user.reducer';
import { IUserFirestore } from '../../models/user.model';
import { UserService } from '../../data-access/user.service';
import { Store } from '@ngrx/store';
import { saveUserFavGenres } from '../../../state/user/user.actions';

@Component({
  selector: 'app-add-genre-dialog',
  templateUrl: './add-genre-dialog.component.html',
  styleUrls: ['./add-genre-dialog.component.scss'],
})
export class AddGenreDialogComponent {
  genreForm: FormGroup;
  allGenres: Genre[];
  userGenres: Genre[];
  modeType: 'movie' | 'tv';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { genres: Genre[]; selectedGenres: Genre[]; user: UserState },
    private formBuilder: FormBuilder,
    private userService: UserService,
    private store: Store,
    public dialogRef: MatDialogRef<AddGenreDialogComponent>
  ) {
    this.allGenres = data.genres;
    this.userGenres = data.selectedGenres;
    this.genreForm = this.formBuilder.group({
      genre: new FormControl(this.userGenres),
    });
  }

  addGenres() {
    const loggerUser = this.data.user.user;
    if (!loggerUser) return;

    const user: IUserFirestore = {
      uid: loggerUser.uid!,
      movie_genres: this.genreForm.value.genre,
      tv_genres: [],
    };
    this.store.dispatch(saveUserFavGenres({ data: user }));
    this.dialogRef.close();
  }

  public objectComparationFunction = function (
    option: Genre,
    value: Genre
  ): boolean {
    return option.id === value.id;
  };
}
