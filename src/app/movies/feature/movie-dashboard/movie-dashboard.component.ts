import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, tap } from 'rxjs';
import { MovieType } from '../../data-access/movie-type';
import { Movie } from '../../data-access/movie';
import { MoviedbApiService } from '../../../shared/data-access/moviedb-api.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent {
  homeView$: Observable<MovieHomeView> = forkJoin(
    [
      this.movieDbService.getMoviesByType(MovieType.POPULAR),
      this.movieDbService.getMoviesByType(MovieType.TOP_RATED),
      this.movieDbService.getMoviesByType(MovieType.LATEST),
    ],
    (...results: any) => {
      return {
        popular: results[0].results.slice(0, 3),
        top: results[1].results.slice(0, 2),
        latest: results[2] as Movie,
      } as MovieHomeView;
    }
  ).pipe(tap((v) => console.log('result2= ', v)));

  constructor(private movieDbService: MoviedbApiService) {}
}

export interface MovieHomeView {
  popular: Movie[];
  top: Movie[];
  latest: Movie;
}
