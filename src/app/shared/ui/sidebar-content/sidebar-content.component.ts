import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../../movies/data-access/movie';
import { environment } from '../../../../environments/environment';
import { Genre } from '../../data-access/genre';
import { MatDialog } from '@angular/material/dialog';
import { AddGenreDialogComponent } from '../add-genre-dialog/add-genre-dialog.component';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../state/user/user.selector';
import { ThemePalette } from '@angular/material/core';
import { IUser } from '../../models/user.model';
import { UserState } from '../../../state/user/user.reducer';
@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent {
  readonly IMAGE_URL = environment.theMovieDbImgUrl;
  authUser$ = this.store.select(selectUserData);
  @Input() title: string;
  @Input() data: Observable<Movie[]>;
  @Input() genres: Genre[];
  @Input() userFavGenres: Genre[];

  constructor(public dialog: MatDialog, private store: Store<any>) {}

  openDialog(user: UserState) {
    this.dialog.open(AddGenreDialogComponent, {
      width: '35rem',
      data: {
        genres: this.genres,
        selectedGenres: this.userFavGenres,
        user: user,
      },
    });
  }

  public getChipColor(genreName: string): ThemePalette {
    switch (genreName) {
      case 'Action' || 'Animation' || 'Comedy' || 'Family' || 'History':
        return 'primary';
      case 'Adventure' || 'Thriller' || 'Western' || 'Horror':
        return 'accent';
      default:
        return 'warn';
    }
  }
}
