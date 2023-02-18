import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../data-access/movie';
import { ApiResponse } from '../../../shared/data-access/api-response';

@Component({
  selector: 'app-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent {
  @Input() data: Observable<Movie[]>;
}
