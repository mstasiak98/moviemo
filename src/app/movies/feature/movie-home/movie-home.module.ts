import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieHomeRoutingModule } from './movie-home-routing.module';
import { MovieHomeComponent } from './movie-home.component';
import { SidebarContentModule } from '../../../shared/ui/sidebar-content/sidebar-content.module';

@NgModule({
  declarations: [MovieHomeComponent],
  imports: [CommonModule, MovieHomeRoutingModule, SidebarContentModule],
})
export class MovieHomeModule {}
