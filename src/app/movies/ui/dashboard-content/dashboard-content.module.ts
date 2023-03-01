import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardContentRoutingModule } from './dashboard-content-routing.module';
import { DashboardContentComponent } from './dashboard-content.component';
import { environment } from '../../../../environments/environment';
import { MovieTileModule } from '../movie-tile/movie-tile.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [DashboardContentComponent],
  exports: [DashboardContentComponent],
  imports: [
    CommonModule,
    DashboardContentRoutingModule,
    MovieTileModule,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress-dark' }),
  ],
})
export class DashboardContentModule {}
