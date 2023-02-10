import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../movies/data-access/movie';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss'],
})
export class MovieTileComponent {
  readonly IMAGE_URL = environment.theMovieDbImgUrl;

  @Input() movie: Movie;
}
