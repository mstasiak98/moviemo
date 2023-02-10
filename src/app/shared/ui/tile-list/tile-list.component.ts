import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../../movies/data-access/movie';

@Component({
  selector: 'app-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent implements OnInit {
  @Input() data: Observable<Movie[]>;

  constructor() {}

  ngOnInit(): void {}
}
