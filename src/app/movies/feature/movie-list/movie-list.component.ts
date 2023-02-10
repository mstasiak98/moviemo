import { Component, OnInit } from '@angular/core';
import { MoviedbApiService } from '../../../shared/data-access/moviedb-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  moviesData$ = this.movieDbService
    .getAllMovies()
    .pipe(map((val: any) => val.results));

  constructor(private movieDbService: MoviedbApiService) {}
}
