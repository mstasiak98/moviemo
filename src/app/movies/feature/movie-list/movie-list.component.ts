import { Component, OnInit } from '@angular/core';
import { MoviedbApiService } from '../../../shared/data-access/moviedb-api.service';
import { Store } from '@ngrx/store';
import {
  loadMovies,
  changeSortMode,
  setGenreFilter,
  setKeywordFilter,
  loadAllMovies,
} from '../../../state/movies/movies.actions';
import {
  selectAllMovies,
  selectCurrentSortMode,
  selectPaginationData,
} from '../../../state/movies/movies.selector';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { sortModes } from '../../utils/sort-mode';
import { forkJoin } from 'rxjs';

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.handleSearchAllMovies();
    this.handleSearchByGenre();
    this.handleSearchByKeyword();
  }

  handleSearchAllMovies(): void {
    if (this.router.url === '/movies/all') {
      this.store.dispatch(loadAllMovies());
    }
  }

  handleSearchByGenre(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.store.dispatch(
          setGenreFilter({ genreId: params.get('id')!, page: 1 })
        );
      }
    });
  }

  handlePageChange($event: PageEvent) {
    this.store.dispatch(loadMovies({ page: $event.pageIndex + 1 }));
  }

  changeSortMode($event: any) {
    this.store.dispatch(
      changeSortMode({ sortMode: $event.target.value, page: 1 })
    );
  }

  handleSearchByKeyword(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('keyword')) {
        this.store.dispatch(
          setKeywordFilter({
            keyword: decodeURI(params.get('keyword')!),
            page: 1,
          })
        );
      }
    });
  }
}
