import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Movie } from '../../data-access/movie';
import { ApiResponse } from '../../../shared/data-access/api-response';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],
})
export class DashboardContentComponent {
  readonly IMAGE_URL = environment.theMovieDbImgUrl;

  @Input() latest: Observable<Movie>;
  @Input() popular: Observable<ApiResponse>;
  @Input() topRated: Observable<ApiResponse>;
}
