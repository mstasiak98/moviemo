import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieHomeComponent } from './movie-home.component';

const routes: Routes = [
  {
    path: '',
    component: MovieHomeComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../movie-dashboard/movie-dashboard.module').then(
            (m) => m.MovieDashboardModule
          ),
      },
      {
        path: 'all',
        loadChildren: () =>
          import('../movie-list/movie-list.module').then(
            (m) => m.MovieListModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieHomeRoutingModule {}
