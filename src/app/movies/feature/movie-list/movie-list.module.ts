import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { TileListModule } from '../../../shared/ui/tile-list/tile-list.module';

@NgModule({
  declarations: [MovieListComponent],
  imports: [CommonModule, MovieListRoutingModule, TileListModule],
})
export class MovieListModule {}