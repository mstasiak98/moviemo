import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTileComponent } from './movie-tile.component';

@NgModule({
  declarations: [MovieTileComponent],
  exports: [MovieTileComponent],
  imports: [CommonModule],
})
export class MovieTileModule {}
