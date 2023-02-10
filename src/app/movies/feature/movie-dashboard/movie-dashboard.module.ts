import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDashboardRoutingModule } from './movie-dashboard-routing.module';
import { MovieDashboardComponent } from './movie-dashboard.component';
import { DashboardContentModule } from '../../../shared/ui/dashboard-content/dashboard-content.module';

@NgModule({
  declarations: [MovieDashboardComponent],
  imports: [CommonModule, MovieDashboardRoutingModule, DashboardContentModule],
})
export class MovieDashboardModule {}
