import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieGenresComponent } from './movie-genres.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GenreDialogDirectiveModule } from '../genre-dialog.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [MovieGenresComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    RouterModule,
    GenreDialogDirectiveModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [MovieGenresComponent],
})
export class MovieGenresModule {}
