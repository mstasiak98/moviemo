import { Component, OnInit } from '@angular/core';
import { MoviedbApiService } from '../../../shared/data-access/moviedb-api.service';
import { forkJoin, map, Observable, of, take, tap } from 'rxjs';
import { MovieType } from '../../data-access/movie-type';
import { Movie } from '../../data-access/movie';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.scss'],
})
export class MovieHomeComponent {
  upcoming$ = this.movieDbService
    .getMoviesByType(MovieType.UPCOMING)
    .pipe(map((v: any) => v.results.slice(0, 2)));

  constructor(private movieDbService: MoviedbApiService) {}
}
