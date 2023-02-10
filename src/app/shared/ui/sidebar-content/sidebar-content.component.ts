import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../../movies/data-access/movie';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent {
  readonly IMAGE_URL = environment.theMovieDbImgUrl;
  @Input() title: string;
  @Input() data: Observable<Movie[]>;

  constructor() {}
}
