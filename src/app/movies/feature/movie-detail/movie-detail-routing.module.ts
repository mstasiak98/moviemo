import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: MovieDetailComponent }];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailRoutingModule {}
