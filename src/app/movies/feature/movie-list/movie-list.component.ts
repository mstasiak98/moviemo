import { Component, OnInit } from '@angular/core';
import { MoviedbApiService } from '../../../shared/data-access/moviedb-api.service';
import { Store } from '@ngrx/store';
import {
  changePage,
  changeSortMode,
  setGenreFilter,
} from '../../../state/movies/movies.actions';
import {
  selectAllMovies,
  selectCurrentSortMode,
  selectPaginationData,
} from '../../../state/movies/movies.selector';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { sortModes } from '../../utils/sort-mode';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  moviesData$ = this.store.select(selectAllMovies);
  paginationData$ = this.store.select(selectPaginationData);
  sortModes = sortModes;
  currentSortMode$ = this.store.select(selectCurrentSortMode);

  constructor(
    private movieDbService: MoviedbApiService,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.store.dispatch(setGenreFilter({ genreId: params.get('id')! }));
      } else {
        this.store.dispatch(setGenreFilter({ genreId: '' }));
      }
      //TODO rename this action name and delete the unnecessary one
      this.store.dispatch(changePage({ page: 1 }));
    });
  }

  handlePageChange($event: PageEvent) {
    this.store.dispatch(changePage({ page: $event.pageIndex + 1 }));
  }

  changeSortMode($event: any) {
    this.store.dispatch(changeSortMode({ sortMode: $event.target.value }));
    this.store.dispatch(changePage({ page: 1 }));
  }
}
