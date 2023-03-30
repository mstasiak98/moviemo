import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../data-access/movie.service';
import { map, tap } from 'rxjs';
import { MovieType } from '../../data-access/movie-type';
import { Store } from '@ngrx/store';
import { selectAllGenres } from '../../../state/movies/movies.selector';
import { loadMovieGenres } from '../../../state/movies/movies.actions';
import {
  selectUserData,
  selectUserFavMovieGenres,
} from '../../../state/user/user.selector';
import { getUserMovieFavGenres } from '../../../state/user/user.actions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.scss'],
})
export class MovieHomeComponent implements OnInit {
  upcoming$ = this.movieDbService
    .getMoviesByType(MovieType.UPCOMING)
    .pipe(map((v: any) => v.results.slice(0, 2)));
  authUser$ = this.store.select(selectUserData);

  genres$ = this.store.select(selectAllGenres);
  userGenres$ = this.store.select(selectUserFavMovieGenres);
  constructor(
    private movieDbService: MovieService,
    private store: Store<any>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(loadMovieGenres());
    this.store.dispatch(getUserMovieFavGenres());
  }
}
