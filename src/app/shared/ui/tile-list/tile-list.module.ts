import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileListComponent } from './tile-list.component';
import { MovieTileModule } from '../movie-tile/movie-tile.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TileListComponent],
  exports: [TileListComponent],
  imports: [CommonModule, MovieTileModule, MatPaginatorModule],
})
export class TileListModule {}
