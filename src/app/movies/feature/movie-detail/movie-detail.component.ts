import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MovieService } from '../../data-access/movie.service';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  readonly IMAGE_URL = environment.theMovieDbImgUrlFullSize;

  movieDetails$ = this.route.paramMap.pipe(
    switchMap((params) => {
      if (params.has('id'))
        return this.moviedbService.getMovieDetails(Number(params.get('id')));
      else return of(null);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private moviedbService: MovieService,
    private router: Router,
    private location: Location
  ) {}

  navBack() {
    this.location.back();
  }
}
