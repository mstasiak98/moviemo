import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardContentRoutingModule } from './dashboard-content-routing.module';
import { DashboardContentComponent } from './dashboard-content.component';
import { environment } from '../../../../environments/environment';
import { MovieTileModule } from '../movie-tile/movie-tile.module';

@NgModule({
  declarations: [DashboardContentComponent],
  exports: [DashboardContentComponent],
  imports: [CommonModule, DashboardContentRoutingModule, MovieTileModule],
})
export class DashboardContentModule {}
