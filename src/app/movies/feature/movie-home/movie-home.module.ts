import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieHomeRoutingModule } from './movie-home-routing.module';
import { MovieHomeComponent } from './movie-home.component';

import { MovieTileModule } from '../../ui/movie-tile/movie-tile.module';
import { MovieGenresModule } from '../../ui/movie-genres/movie-genres.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [MovieHomeComponent],
  imports: [
    CommonModule,
    MovieHomeRoutingModule,
    MovieTileModule,
    MovieGenresModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
})
export class MovieHomeModule {}
