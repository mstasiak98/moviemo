import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieHomeView } from '../../../movies/feature/movie-dashboard/movie-dashboard.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],
})
export class DashboardContentComponent {
  readonly IMAGE_URL = environment.theMovieDbImgUrl;

  @Input() data: Observable<MovieHomeView>;
}
