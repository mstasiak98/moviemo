import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { MovieType } from '../../data-access/movie-type';
import { Movie } from '../../data-access/movie';
import { MovieService } from '../../data-access/movie.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent {
  latest$ = this.movieDbService
    .getMoviesByType(MovieType.LATEST)
    .pipe(map((res: any) => res));
  popular$ = this.movieDbService.getMoviesByType(MovieType.POPULAR);
  topRated$ = this.movieDbService.getMoviesByType(MovieType.TOP_RATED);

  constructor(private movieDbService: MovieService) {}
}
