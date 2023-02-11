import { Component, OnInit } from '@angular/core';
import { MoviedbApiService } from '../../../shared/data-access/moviedb-api.service';
import { Store } from '@ngrx/store';
import { changePage, loadMovies } from '../../../state/movies/movies.actions';
import {
  selectAllMovies,
  selectPaginationData,
} from '../../../state/movies/movies.selector';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  moviesData$ = this.store.select(selectAllMovies);
  paginationData$ = this.store.select(selectPaginationData);

  constructor(
    private movieDbService: MoviedbApiService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadMovies());
  }

  handlePageChange($event: PageEvent) {
    this.store.dispatch(changePage({ page: $event.pageIndex + 1 }));
  }
}
