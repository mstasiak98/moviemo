import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieHomeComponent } from './movie-home.component';

const routes: Routes = [
  {
    path: '',
    component: MovieHomeComponent,
    children: [
      /*
      {
        path: 'now-playing',
        loadChildren: () =>
          import('../movie-list/movie-list.module').then(
            (m) => m.MovieListModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../movie-list/movie-list.module').then(
            (m) => m.MovieListModule
          ),
      },
      {
        path: 'genre/:id',
        loadChildren: () =>
          import('../movie-list/movie-list.module').then(
            (m) => m.MovieListModule
          ),
      },*/
      {
        path: 'details/:id',
        loadChildren: () =>
          import('../movie-detail/movie-detail.module').then(
            (m) => m.MovieDetailModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../movie-dashboard/movie-dashboard.module').then(
            (m) => m.MovieDashboardModule
          ),
      },
      {
        path: 'list',
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
