import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileListComponent } from './tile-list.component';
import { MovieTileModule } from '../movie-tile/movie-tile.module';

@NgModule({
  declarations: [TileListComponent],
  exports: [TileListComponent],
  imports: [CommonModule, MovieTileModule],
})
export class TileListModule {}
