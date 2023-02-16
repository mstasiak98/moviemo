import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTileComponent } from './movie-tile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieTileComponent],
  exports: [MovieTileComponent],
  imports: [CommonModule, RouterModule],
})
export class MovieTileModule {}
